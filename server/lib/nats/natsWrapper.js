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
const streamName = process.env.NATS_STREAM_NAME || 'flags';

const natsConfig = {
  // Create Nats Connection
  servers: process.env.NATS_SERVER || 'nats://127.0.0.1:4222',
  token: process.env.NATS_TOKEN || '',
};

class NatsWrapper {
  constructor() {
    this.natsConnection = null;
    this.jetStreamManager = null;
    this.jetStream = null;
    this.flagStreamInfo = null;
  }

  async init() {
    this.natsConnection = await connect(natsConfig);
    this.jetStreamManager = await this.natsConnection.jetstreamManager(); // JetStream Manager can add streams and modify stream configurations (add/edit subjects etc)
    this.jetStream = await this.natsConnection.jetstream(); // JetStream Connection can publish to subjects on stream, subscribe to subjects on stream
    this.flagsStreamInfo = await this.jetStreamManager.streams.info(streamName);
  }

  async publishAppFlags(subject, message) {
    await this.addMissingSubjectToStream(subject);
    await this.jetStream?.publish(subject, jsonCoder.encode(message));
  }

  async publishOpenCircuit(decodedData) {
    const flag = await openCircuit(decodedData);
    await circuitOpenedLog(flag);
    const flags = await getAppFlags(flag);
    this.publishAppFlags(flag.app_id, flags);
  }

  async endConnection() {
    await this.natsConnection?.drain();
    await this.natsConnection?.close();
    console.log('nats connection closed');
  }

  async subscribeCircuitOpenMessages() {
    const options = consumerOpts(); // creates a Consumer Options Object
    options.deliverNew(); // ensures that the newest message on the stream is delivered to the consumer when it comes online
    options.ackAll(); // acknowledges all previous messages
    options.deliverTo(createInbox()); // ensures that the Consumer listens to a specific Subject
    await this.addMissingSubjectToStream(circuitOpenSubject);

    (async () => {
      const subscribedStream = await this.jetStream?.subscribe(
        circuitOpenSubject, // subject: circuit_open
        options
      );
      console.log('subscribed to open circuit stream');
      decodeReceivedMessages(subscribedStream, this.publishOpenCircuit);
    })();
  }
  async addMissingSubjectToStream(subject) {
    subject = String(subject);
    const subjectsInStream = this.flagsStreamInfo?.config.subjects;

    if (!subjectsInStream?.includes(subject)) {
      subjectsInStream?.push(subject);
      await this.jetStreamManager?.streams.update(
        streamName,
        this.flagsStreamInfo.config
      );
    }
  }
}

// Docker -> set the streamName to 'flags'
// Set the Subject to be 'circuit_open'
// Set the Subject to be 'circuit_close'

module.exports = NatsWrapper;
