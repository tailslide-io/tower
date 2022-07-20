const { consumerOpts, createInbox, JSONCodec, StringCodec } = require('nats');
const db = require('../db');

const jsonCoder = JSONCodec();
const stringCoder = StringCodec();

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
  flag.rollout_percentage = Number(flag.rollout_percentage);
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

module.exports = {
  decodeReceivedMessages,
  openCircuit,
  circuitClosedLog,
  circuitOpenedLog,
  getAppFlags,
};
