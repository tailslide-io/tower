const db = require('../lib/db');

const getAppFlags = async (req, res, next) => {
  const appId = req.flag.app_id;
  const response = await db.getFlags(appId);
  req.flags = response.rows;
  next();
};

const publishAppFlags = async (req, res, next) => {
  const nats = await require('../lib/nats');
  const appId = req.flag.app_id;
  const flagRuleset = req.flags;
  await nats.publish(appId, flagRuleset);
  next();
};

module.exports = {
  getAppFlags,
  publishAppFlags,
};
