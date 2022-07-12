const db = require('../lib/db');

const getFlags = async (req, res) => {
  const appId = req.params.appId;
  const response = await db.getFlags(appId);
  const payload = response.rows[0];
  res.status(200).json({ payload });
};

const getFlag = async (req, res) => {
  const flagId = req.params.flagId;
  const response = await db.getFlag(flagId);
  const item = response.rows[0];
  const flagData = {
    title: item.title,
    flag_description: item.flag_description,
    rollout: item.rollout,
    white_listed_users: item.white_listed_users,
    error_threshold: item.error_threshold,
  };

  const logsData = response.rows.map((row) => {
    return {
      log_id: row.log_id,
      flag_id: row.flag_id,
      log_description: row.log_description,
      action_type: row.action_type,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  });
  flagData.logs = logsData;
  /*
   {
    title: 'First Flag in first App',
    flag_description: '',
    is_active: false,
    rollout: '0',
    white_listed_users: '',
    error_threshold: '0.0',
     logs: [
       {
          log_id: 1,
          flag_id: 1,
          log_description: 'Flag created',
          action_type: 'create',
          created_at: 2022-07-12T20:22:05.342Z,
          updated_at: 2022-07-12T20:22:05.342Z,
       }

     ]
  }

  */
  res.status(200).json({ payload: flagData });
};

const createFlag = async (req, res, next) => {
  const appId = req.params.appId;
  const data = { ...req.body, app_id: appId };
  const response = await db.createFlag(data);
  const payload = response.rows[0];
  payload.rollout = Number(payload.rollout);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  next();
};

const updateFlag = async (req, res) => {};

const deleteFlag = async (req, res) => {
  const { flagId } = req.params;

  const response = await db.deleteFlag(flagId);
  const returnedFlagId = response.rows[0];
  res.status(200).json({ flagId: returnedFlagId });
};

module.exports = {
  getFlags,
  getFlag,
  createFlag,
  deleteFlag,
  updateFlag,
};
