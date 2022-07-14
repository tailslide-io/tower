const db = require('../lib/db');

const getFlags = async (req, res) => {
  const appId = req.params.appId;
  const response = await db.getFlags(appId);
  const payload = response.rows;
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
  res.status(200).json({ payload: flagData });
};

const createFlag = async (req, res, next) => {
  const appId = Number(req.params.appId);
  const data = { ...req.body, app_id: appId };
  const response = await db.createFlag(data);
  const payload = response.rows[0];
  payload.rollout = Number(payload.rollout);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  next();
};

const updateFlag = async (req, res, next) => {
  const flagId = Number(req.params.flagId);
  const data = req.body;
  const response = await db.updateFlag(flagId, data);
  const payload = response.rows[0];
  payload.rollout = Number(payload.rollout);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  next();
};

const deleteFlag = async (req, res, next) => {
  const { flagId } = req.params;

  const response = await db.deleteFlag(flagId);
  req.flag = response.rows[0];
  next();
};

const openCircuit = async (req, res, next) => {
  const { flagId } = req.params;
  const response = await db.updateFlag(flagId, { is_active: false });
  const payload = response.rows[0];
  payload.rollout = Number(payload.rollout);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  next();
};

const closeCircuit = async (req, res, next) => {
  const { flagId } = req.params;
  const response = await db.updateFlag(flagId, { is_active: true });
  const payload = response.rows[0];
  payload.rollout = Number(payload.rollout);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  next();
};

const returnCreatedFlag = (req, res) => {
  const flag = req.flag;
  res.status(201).json({ payload: flag });
};

module.exports = {
  getFlags,
  getFlag,
  createFlag,
  deleteFlag,
  updateFlag,
  openCircuit,
  closeCircuit,
  returnCreatedFlag,
};
