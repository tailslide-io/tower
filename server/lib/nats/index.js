const {
  CIRCUIT_OPEN_SUBJECT,
  CIRCUIT_RECOVERY_START_SUBJECT,
  CIRCUIT_RECOVERY_UPDATE_SUBJECT,
  CIRCUIT_CLOSE_SUBJECT,
} = require('./helpers');

const NatsWrapper = require('./natsWrapper');

const natsClient = new NatsWrapper();

module.exports = (async () => {
  await natsClient.init();
  await natsClient.subscribeMessages(CIRCUIT_OPEN_SUBJECT);
  await natsClient.subscribeMessages(CIRCUIT_RECOVERY_START_SUBJECT);
  await natsClient.subscribeMessages(CIRCUIT_RECOVERY_UPDATE_SUBJECT);
  await natsClient.subscribeMessages(CIRCUIT_CLOSE_SUBJECT);
  return natsClient;
})();
