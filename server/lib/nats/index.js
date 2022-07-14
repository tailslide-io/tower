// require('dotenv').config();
const { connect, JSONCodec, consumerOpts, createInbox } = require('nats');
const db = require('../db');

let natsConnection;
let jetStreamManager;
let jetStream;
let publish;
let endConnection;

const jsonCoder = JSONCodec();

// (async () => {
//   // Create Nats Connection
//   natsConnection = await connect({
//     servers: 'nats://127.0.0.1:4222',
//     // token: '1234',
//   });

//   jetStreamManager = await natsConnection.jetstreamManager(); // Creating JetStream Manager (adds streams, subjects)
//   jetStream = await natsConnection.jetstream(); // Creating JetStream Connections (publish to subjects on stream, subscribe to subjects on stream)

//   const streamName = 'flags';
//   const dbResponse = await db.getApps();
//   const apps = dbResponse.rows;
//   const appTitles = apps.map((app) => app.title);

//   // appTitles = ['app1', 'app2']
//   // subject: appTitles

//   await jetStreamManager.streams.add({
//     name: 'stream',
//     subjects: appTitles,
//   }); // JSM - adds a Stream and Subjects on the Stream

//   publish = async (streamName, message) => {
//     await jetStream.publish(streamName, stringCoder.encode(message)); // publishes encoded string to subject 'teststream'
//   };

//   endConnection = async () => {
//     console.log('nats connection closed');
//     await natsConnection.close();
//   };
// })();

module.exports = (async () => {
  // Create Nats Connection
  natsConnection = await connect({
    servers: 'nats://127.0.0.1:4222',
    // token: '1234',
  });

  jetStreamManager = await natsConnection.jetstreamManager(); // Creating JetStream Manager (adds streams, subjects)
  jetStream = await natsConnection.jetstream(); // Creating JetStream Connections (publish to subjects on stream, subscribe to subjects on stream)

  const streamName = 'flags';
  const dbResponse = await db.getApps();
  const apps = dbResponse.rows;
  const appId = apps.map((app) => String(app.id));

  // TODO: handle how to add new topics to existing stream and how to not recreate existing stream

  // await jetStreamManager.streams.add({
  //   name: streamName,
  //   subjects: appId,
  // }); // JSM - adds a Stream and Subjects on the Stream

  publish = async (subject, message) => {
    await jetStream.publish(subject, jsonCoder.encode(message));
  };

  endConnection = async () => {
    const done = natsConnection.closed();
    await natsConnection.drain();
    await natsConnection.close();
    console.log('nats connection closed');
    const err = await done;
  };

  return { publish, endConnection };
})();
