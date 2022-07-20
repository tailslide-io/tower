const db = require('../lib/db');

const getLogsForApp = async (req, res) => {
  const appId = req.params.appId;
  const response = await db.getLogs(appId);
  const payload = response.rows;
  res.status(200).json({ payload });
};

const flagCreatedLog = async (req, res, next) => {
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Flag created',
    action_type: 'create',
  };

  await db.createLog(data);
  next();
};

const flagUpdatedLog = async (req, res, next) => {
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Flag updated',
    action_type: 'update',
  };
  await db.createLog(data);
  next();
};

const flagDeletedLog = async (req, res, next) => {
  const flag = req.flag;
  const data = {
    flag_id: null,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Flag deleted',
    action_type: 'delete',
  };
  await db.createLog(data);
  next();
};

const circuitOpenedLog = async (req, res, next) => {
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Circuit tripped open',
    action_type: 'circuit_open',
  };
  await db.createLog(data);
  next();
};

const circuitClosedLog = async (req, res, next) => {
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Circuit closed',
    action_type: 'circuit_close',
  };
  await db.createLog(data);
  next();
};

module.exports = {
  flagCreatedLog,
  flagUpdatedLog,
  flagDeletedLog,
  circuitOpenedLog,
  circuitClosedLog,
  getLogsForApp,
};
