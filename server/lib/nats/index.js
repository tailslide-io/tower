// require('dotenv').config();
const NatsWrapper = require('./natsWrapper');

const natsClient = new NatsWrapper();

module.exports = (async () => {
  await natsClient.init();
  await natsClient.subscribeCircuitOpenMessages();
  return natsClient;
})();
