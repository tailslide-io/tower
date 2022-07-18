// require('dotenv').config();
const {
  connect,
  JSONCodec,
  StringCodec,
  consumerOpts,
  createInbox,
} = require('nats');
const db = require('../db');

let natsConnection;
let jetStreamManager;
let jetStream;
let publishAppFlags;
let endConnection;

const jsonCoder = JSONCodec();
const stringCoder = StringCodec();

const circuitOpenSubject = 'circuit_open';
const circuitCloseSubject = 'circuit_close';

const decodeReceivedMessages = async (messages, callback) => {
  for await (const message of messages) {
    console.log('within decodeReceivedMessages');
    let decodedData;
    try {
      decodedData = jsonCoder.decode(message.data);
    } catch (e) {
      decodedData = stringCoder.decode(message.data);
    }
    console.log('got decodedData from fetchStreamMessage', decodedData);
    console.log(decodedData);
    await callback(decodedData);
  }
};

const openCircuit = async (flagId) => {
  const response = await db.updateFlag(flagId, { is_active: false });
  const flag = response.rows[0];
  flag.rollout = Number(flag.rollout);
  flag.error_threshold = Number(flag.error_threshold);
  return flag;
};

const circuitOpenedLog = async (flag) => {
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Circuit tripped open',
    action_type: 'circuitOpen',
  };
  await db.createLog(data);
};

const circuitClosedLog = async (flag) => {
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Circuit closed',
    action_type: 'circuitClose',
  };
  await db.createLog(data);
};

const getAppFlags = async (flag) => {
  const appId = flag.app_id;
  const response = await db.getFlags(appId);
  const flags = response.rows;
  return flags;
};

module.exports = (async () => {
  // Create Nats Connection
  natsConnection = await connect({
    servers: 'nats://127.0.0.1:4222',
    // token: '1234',
  });

  jetStreamManager = await natsConnection.jetstreamManager(); // JetStream Manager can add streams and modify stream configurations (add/edit subjects etc)
  jetStream = await natsConnection.jetstream(); // JetStream Connection can publish to subjects on stream, subscribe to subjects on stream

  // Stream Creation - happens on Docker compose, not done within application code, ensure Stream is named 'flags'

  // Obtains all appIds from the database (the appIds will be the subjects in the "flags" stream)
  const streamName = 'flags';
  const dbResponse = await db.getApps();
  const apps = dbResponse.rows;
  const appIds = apps.map((app) => String(app.id));

  // Retrieve info about the stream 'flags'
  const flagsStreamInfo = await jetStreamManager.streams.info(streamName);

  publishAppFlags = async (subject, message) => {
    // check if the current 'publish' attempt has a subject that is included in the current 'flags' stream subjects
    // if not, mutate the flagsStreamInfo configuration object to add the new subject
    // then publish the message to the newly created subject
    subject = String(subject);
    if (!appIds.includes(subject)) {
      flagsStreamInfo.config.subjects?.push(subject);
      await jetStreamManager.streams.update(streamName, flagsStreamInfo.config);
    }

    await jetStream.publish(subject, jsonCoder.encode(message));
  };

  endConnection = async () => {
    const done = natsConnection.closed();
    await natsConnection.drain();
    await natsConnection.close();
    console.log('nats connection closed');
    const err = await done;
  };

  const publishOpenCircuit = async (decodedData) => {
    const flag = await openCircuit(decodedData);
    await circuitOpenedLog(flag);
    const flags = await getAppFlags(flag);
    publishAppFlags(flag.app_id, flags);
  };

  // listen for circuit open messages
  const options = consumerOpts(); // creates a Consumer Options Object
  options.deliverNew(); // ensures that the newest message on the stream is delivered to the consumer when it comes online
  options.ackAll(); // acknowledges all previous messages
  options.deliverTo(createInbox()); // ensures that the Consumer listens to a specific Subject
  (async () => {
    const subscribedStream = await jetStream?.subscribe(
      circuitOpenSubject,
      options
    );
    console.log('subscribed to open circuit stream');
    decodeReceivedMessages(subscribedStream, publishOpenCircuit);
  })();

  return { publishAppFlags, endConnection };
})();
