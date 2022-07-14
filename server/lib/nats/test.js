const { connect, StringCodec, consumerOpts, createInbox } = require('nats');

const stringCoder = StringCodec();

// const jc = JSONCodec();
// nc.publish("updates", jc.encode({ ticker: "GOOG", price: 2868.87 }));

let natsConnection;
let jetStreamManager;
let jetStream;
/*
  Create a connection object to Nats
  Create a connection object to Jetstream Manager
   - using JSM, create a nats stream with name 'flags', with each subject belonging to apps' names
   - get apps names from database

  - create a publish function
*/

(async () => {
  natsConnection = await connect({
    // Create Nats Connection
    servers: 'nats://127.0.0.1:4222',
    // token: '1234',
  });

  jetStreamManager = await natsConnection.jetstreamManager(); // Creating JetStream Manager (adds streams, subjects)
  jetStream = await natsConnection.jetstream(); // Creating JetStream Connections (publish to subjects on stream, subscribe to subjects on stream)

  jetStreamManager.streams.add({ name: 'stream', subjects: ['teststream'] }); // JSM - adds a Stream and Subjects on the Stream

  // Publishing to NATS (Publisher)
  let message = stringCoder.encode('new message!'); // encodes the string
  jetStream.publish('teststream', message); // publishes encoded string to subject 'teststream'

  // Creating a Consumer with Configurations
  const options = consumerOpts(); // creates a Consumer Options Object
  options.deliverLast(); // ensures that the last message on the stream is delivered to the consumer when it comes online
  options.ackAll(); // acknowledges all previous messages
  options.deliverTo(createInbox()); // ensures that the Consumer listens to a specific Subject

  const subscribedStream = await jetStream.subscribe('teststream', options); // creates a Consumer that is subscribed to 'teststream' with the set Consumer Options

  const done = (async () => {
    for await (const message of subscribedStream) {
      // iterates through the messages on subscribedStream
      const decodedData = stringCoder.decode(message.data); // decodes the incoming message
      console.log(decodedData);
    }
  })();
})();
// publish flag to jetstream
// receive acknowledgement from jetstream that Publish was Successful

module.exports = {
  natsConnection,
  jetStreamManager,
  jetStream,
};
