const db = require('../lib/db');
const { formatPercentagesInData } = require('../lib/utils');

const appsManualSubject = (appId) => `apps.${appId}.update.manual`;

const getAppFlags = async (req, res, next) => {
  const appId = req.flag.app_id;
  const response = await db.getFlags(appId);

  const flags = response.rows;
  const formattedFlags = flags.map(formatPercentagesInData);
  req.flags = formattedFlags;
  next();
};

const publishAppFlags = async (req, res, next) => {
  const natsClient = await require('../lib/nats');
  const appId = req.flag.app_id;
  const flagRuleset = req.flags;
  await natsClient.publishAppFlags(appsManualSubject(appId), flagRuleset);
  next();
};

module.exports = {
  getAppFlags,
  publishAppFlags,
};
