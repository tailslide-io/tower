// require('dotenv').config();
const {
  connect,
  JSONCodec,
  StringCodec,
  consumerOpts,
  createInbox,
} = require('nats');

const {
  decodeReceivedMessages,
  openCircuit,
  circuitClosedLog,
  circuitOpenedLog,
  getAppFlags,
} = require('./helpers');
const db = require('../db');

const circuitOpenSubject = 'circuit_open';
const circuitCloseSubject = 'circuit_close';

const jsonCoder = JSONCodec();
const stringCoder = StringCodec();

module.exports = (async () => {
  const natsConnection = await connect({
    // Create Nats Connection
    servers: 'nats://127.0.0.1:4222',
    // token: '1234',
  });

  const jetStreamManager = await natsConnection.jetstreamManager(); // JetStream Manager can add streams and modify stream configurations (add/edit subjects etc)
  const jetStream = await natsConnection.jetstream(); // JetStream Connection can publish to subjects on stream, subscribe to subjects on stream

  // Stream Creation - happens on Docker compose, not done within application code, ensure Stream is named 'flags'

  // Obtains all appIds from the database (the appIds will be the subjects in the "flags" stream)
  const streamName = 'flags';
  const dbResponse = await db.getApps();
  const apps = dbResponse.rows;
  const appIds = apps.map((app) => String(app.id));

  // Retrieve info about the stream 'flags'
  const flagsStreamInfo = await jetStreamManager.streams.info(streamName);

  const publishAppFlags = async (subject, message) => {
    // check if the current 'publish' attempt has a subject that is included in the current 'flags' stream subjects
    // if not, mutate the flagsStreamInfo configuration object to add the new subject
    // then publish the message to the newly created subject
    console.log('within publishAppFlags');
    subject = String(subject);
    console.log(appIds, subject);
    const subjectsInStream = flagsStreamInfo.config.subjects;
    if (!subjectsInStream.includes(subject)) {
      console.log('within the if');
      subjectsInStream.push(subject);
      await jetStreamManager.streams.update(streamName, flagsStreamInfo.config);
    }

    await jetStream.publish(subject, jsonCoder.encode(message));
  };

  const endConnection = async () => {
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

  const subscribeCircuitOpenMessages = () => {
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
  };

  subscribeCircuitOpenMessages();

  return { publishAppFlags, endConnection };
})();
