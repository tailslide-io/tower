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
  updateCircuitRecoveryPercentage,
  closeCircuit,
  CIRCUIT_OPEN_SUBJECT,
  CIRCUIT_CLOSE_SUBJECT,
  CIRCUIT_RECOVERY_START_SUBJECT,
  CIRCUIT_RECOVERY_UPDATE_SUBJECT,
} = require('./helpers');

const db = require('../db');

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

  _getPublisher(subject) {
    const publishers = {
      [CIRCUIT_OPEN_SUBJECT]: this.publishCircuitOpen,
      [CIRCUIT_CLOSE_SUBJECT]: this.publishCircuitClose,
      [CIRCUIT_RECOVERY_START_SUBJECT]: this.publishCircuitRecoveryStart,
      [CIRCUIT_RECOVERY_UPDATE_SUBJECT]: this.publishCircuitRecoveryUpdate,
    };
    return publishers[subject];
  }

  _getDecoder(subject) {
    const decoders = {
      [CIRCUIT_OPEN_SUBJECT]: stringCoder,
      [CIRCUIT_CLOSE_SUBJECT]: stringCoder,
      [CIRCUIT_RECOVERY_START_SUBJECT]: jsonCoder,
      [CIRCUIT_RECOVERY_UPDATE_SUBJECT]: jsonCoder,
    };
    return decoders[subject];
  }

  async publishCircuitOpen(decodedData) {
    const flag = await openCircuit(decodedData);
    await circuitOpenedLog(flag);
    this.publishMessageToStream(flag);
  }

  async publishCircuitClose(decodedData) {
    const flag = await closeCircuit(decodedData);
    await circuitClosedLog(flag);
    this.publishMessageToStream(flag);
  }

  async publishCircuitRecoveryStart(decodedData) {
    const flag = await updateCircuitRecoveryPercentage(decodedData);
    this.publishMessageToStream(flag);
  }

  async publishCircuitRecoveryUpdate(decodedData) {
    const flag = await updateCircuitRecoveryPercentage(decodedData);
    this.publishMessageToStream(flag);
  }

  async publishMessageToStream(flag) {
    const flags = await getAppFlags(flag);
    this.publishAppFlags(flag.app_id, flags);
  }

  async endConnection() {
    await this.natsConnection?.drain();
    await this.natsConnection?.close();
    console.log('nats connection closed');
  }

  async subscribeMessages(subject) {
    const options = consumerOpts(); // creates a Consumer Options Object
    options.deliverNew(); // ensures that the newest message on the stream is delivered to the consumer when it comes online
    options.ackAll(); // acknowledges all previous messages
    options.deliverTo(createInbox()); // ensures that the Consumer listens to a specific Subject
    await this.addMissingSubjectToStream(subject);

    (async () => {
      const subscribedStream = await this.jetStream?.subscribe(
        subject,
        options
      );
      console.log(`subscribed to ${subject} stream`);
      decodeReceivedMessages(
        subscribedStream,
        this._getPublisher(subject).bind(this),
        this._getDecoder(subject)
      );
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
