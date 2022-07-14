// require('dotenv').config();
const { connect, JSONCodec, consumerOpts, createInbox } = require('nats');
const db = require('../db');

let natsConnection;
let jetStreamManager;
let jetStream;
let publishAppFlags;
let endConnection;

const jsonCoder = JSONCodec();

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

  return { publishAppFlags, endConnection };
})();
