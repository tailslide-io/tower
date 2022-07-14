const db = require('../lib/db');

const getLogsForApp = async (req, res) => {
  const appId = req.params.appId;
  const response = await db.getLogs(appId);
  const payload = response.rows;
  res.status(200).json({ payload });
};

const flagCreatedLog = async (req, res, next) => {
  // create log with action_type: create, description: "Flag created"
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
  // req.payload = { status: 201, data: dbResponse.rows[0] };

  /*
    req = {
      ...
      flag: {
        id
        app_id
        title
        description
      }
    }

  */
  next();
  // res.status(201).json({ payload: flag });
};

const flagUpdatedLog = async (req, res) => {
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
  res.status(200).json({ payload: flag });
};

const flagDeletedLog = async (req, res) => {
  const flag = req.flagId;
  const data = {
    flag_id: null,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Flag deleted',
    action_type: 'delete',
  };
  await db.createLog(data);
  res.status(200).json({ payload: flag.id });
};

const circuitOpenedLog = async (req, res) => {
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Circuit tripped open',
    action_type: 'circuitOpen',
  };
  await db.createLog(data);
  res.status(200).json({ payload: flag });
};

const circuitClosedLog = async (req, res) => {
  const flag = req.flag;
  const data = {
    flag_id: flag.id,
    app_id: flag.app_id,
    flag_title: flag.title,
    flag_description: flag.description,
    description: 'Circuit closed',
    action_type: 'circuitClose',
  };
  await db.createLog(data);
  res.status(200).json({ payload: flag });
};

module.exports = {
  flagCreatedLog,
  flagUpdatedLog,
  flagDeletedLog,
  circuitOpenedLog,
  circuitClosedLog,
  getLogsForApp,
};
