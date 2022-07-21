const CIRCUIT_OPEN_SUBJECT = 'circuit_open';
const CIRCUIT_RECOVERY_START_SUBJECT = 'circuit_recovery_start';
const CIRCUIT_RECOVERY_UPDATE_SUBJECT = 'circuit_recovery_update';
const CIRCUIT_CLOSE_SUBJECT = 'circuit_close';

const { consumerOpts, createInbox, JSONCodec, StringCodec } = require('nats');
const db = require('../db');
const {
  formatPercentagesInData,
  formatPercentagesInBody,
} = require('../utils');

// const jsonCoder = JSONCodec();
// const stringCoder = StringCodec();

const decodeReceivedMessages = async (messages, callback, decoder) => {
  for await (const message of messages) {
    let decodedData = decoder.decode(message.data);
    // try {
    //   decodedData = jsonCoder.decode(message.data);
    // } catch (e) {
    //   decodedData = stringCoder.decode(message.data);
    // }
    console.log('got decodedData from fetchStreamMessage', decodedData);
    console.log(decodedData);
    await callback(decodedData);
  }
};

const openCircuit = async (flagId) => {
  const response = await db.updateFlag(flagId, {
    is_active: false,
    circuit_status: 'open',
  });
  const flag = response.rows[0];
  const formattedFlag = formatPercentagesInData(flag);
  return formattedFlag;
};

const closeCircuit = async (flagId) => {
  const data = {
    is_active: true,
    circuit_status: 'close',
    circuit_recovery_percentage: 100,
  };
  const formattedData = formatPercentagesInBody(data);
  const response = await db.updateFlag(flagId, formattedData);
  const flag = response.rows[0];
  const formattedFlag = formatPercentagesInData(flag);
  return formattedFlag;
};

const updateCircuitRecoveryPercentage = async (flagId, body) => {
  const formattedBody = formatPercentagesInBody(body);
  const response = await db.updateFlag(flagId, formattedBody);
  const flag = response.rows[0];
  const formattedFlag = formatPercentagesInData(flag);
  return formattedFlag;
};

const circuitOpenedLog = async (flag) => {
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Circuit tripped open',
    action_type: 'circuit_open',
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
    action_type: 'circuit_close',
  };
  await db.createLog(data);
};

const getAppFlags = async (flag) => {
  const appId = flag.app_id;
  const response = await db.getFlags(appId);
  const flags = response.rows;
  const formattedFlags = flags.map(formatPercentagesInData);
  return formattedFlags;
};

module.exports = {
  decodeReceivedMessages,
  openCircuit,
  closeCircuit,
  circuitClosedLog,
  circuitOpenedLog,
  getAppFlags,
  updateCircuitRecoveryPercentage,
  CIRCUIT_OPEN_SUBJECT,
  CIRCUIT_CLOSE_SUBJECT,
  CIRCUIT_RECOVERY_START_SUBJECT,
  CIRCUIT_RECOVERY_UPDATE_SUBJECT,
};
