const CIRCUIT_OPEN_SUBJECT = 'circuit_open';
const CIRCUIT_RECOVERY_START_SUBJECT = 'circuit_recovery_start';
const CIRCUIT_RECOVERY_UPDATE_SUBJECT = 'circuit_recovery_update';
const CIRCUIT_CLOSE_SUBJECT = 'circuit_close';

const { default: axios } = require('axios');
const { default: axiosRetry } = require('axios-retry');
const db = require('../db');
const {
  formatPercentagesInData,
  formatPercentagesInBody,
} = require('../utils');

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response.status < 200 || error.response.status >= 300;
  },
});

const decodeReceivedMessages = async (messages, callback, decoder) => {
  for await (const message of messages) {
    let decodedData = decoder.decode(message.data);
    await callback(decodedData);
  }
};

const openCircuit = async (flagId) => {
  const data = {
    is_active: false,
    circuit_recovery_percentage: 0,
    circuit_status: 'open',
  };
  const response = await db.updateFlag(flagId, data);
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

const webhookRequestWithRetry = (url, webhookMessage) => {
  axios.post(url, { text: webhookMessage }).catch((_) => {});
};

const publishWebhooks = async (flagId) => {
  const response = await db.getFlagWebhooksInfo(flagId);
  const flag = response.rows[0];
  const webhookMessage = getWebhookMessage(flag);

  const flagWebhookURLs = flag.webhooks.split(',');
  flagWebhookURLs.forEach((url) => {
    webhookRequestWithRetry(url, webhookMessage);
  });
};

const getWebhookMessage = ({ flag_title, app_title, circuit_status }) => {
  let message = `${flag_title} in ${app_title} has `;

  if (circuit_status === 'open') {
    message += 'tripped open!';
  } else if (circuit_status === 'close') {
    message += 'recovered successfully and closed!';
  } else if (circuit_status === 'recovery') {
    message += 'started recovering!';
  }
  return message;
};

const updateCircuitRecoveryPercentage = async (data) => {
  let flagId = data.flagId;
  let circuit_recovery_percentage =
    data.circuitInitialRecoveryPercentage || data.circuitRecoveryPercentage;
  let body = {
    is_active: true,
    circuit_status: 'recovery',
    circuit_recovery_percentage,
  };
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

const getAppFlagsFromFlag = async (flag) => {
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
  getAppFlagsFromFlag,
  updateCircuitRecoveryPercentage,
  CIRCUIT_OPEN_SUBJECT,
  CIRCUIT_CLOSE_SUBJECT,
  CIRCUIT_RECOVERY_START_SUBJECT,
  CIRCUIT_RECOVERY_UPDATE_SUBJECT,
  publishWebhooks,
};
