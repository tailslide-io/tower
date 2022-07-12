const db = require('../lib/db');

const flagCreatedLog = async (req, res) => {
  // create log with action_type: create, description: "Flag created"
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    description: 'Flag created',
    action_type: 'create',
  };
  console.log(data);
  await db.createLog(data);
  res.status(201).json({ payload: flag });
};

const flagUpdatedLog = async (req, res) => {
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    description: 'Flag updated',
    action_type: 'update',
  };
  await db.createLog(data);
  res.status(200).json({ payload: flag });
};

const getLogsForApp = async (req, res) => {};

module.exports = {
  flagCreatedLog,
  flagUpdatedLog,
};
