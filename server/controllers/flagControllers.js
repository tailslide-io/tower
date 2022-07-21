const db = require('../lib/db');
const {
  formatPercentagesInBody,
  formatPercentagesInData,
} = require('../lib/utils');

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
    id: item.id,
    title: item.title,
    app_id: item.app_id,
    is_active: item.is_active,
    flag_description: item.flag_description,
    rollout_percentage: item.rollout_percentage,
    white_listed_users: item.white_listed_users,
    circuit_status: item.circuit_status,
    is_recoverable: item.is_recoverable,
    error_threshold_percentage: item.error_threshold_percentage,
    circuit_recovery_percentage: item.circuit_recovery_percentage,
    circuit_recovery_delay: item.circuit_recovery_delay,
    circuit_initial_recovery_percentage:
      item.circuit_initial_recovery_percentage,
    circuit_recovery_rate: item.circuit_recovery_rate,
    circuit_recovery_increment_percentage:
      item.circuit_recovery_increment_percentage,
    circuit_recovery_profile: item.circuit_recovery_profile,
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
  const formattedData = formatPercentagesInBody(data);
  console.log(formattedData);
  const response = await db.createFlag(formattedData);
  const payload = response.rows[0];
  const formattedPayload = formatPercentagesInData(payload);
  req.flag = formattedPayload;
  next();
};

const updateFlag = async (req, res, next) => {
  const flagId = Number(req.params.flagId);
  const data = req.body;
  const response = await db.updateFlag(flagId, data);
  const payload = response.rows[0];
  payload.rollout_percentage = Number(payload.rollout_percentage);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  console.log(
    '🚀 ~ file: flagControllers.js ~ line 58 ~ updateFlag ~ payload',
    payload
  );
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
  payload.rollout_percentage = Number(payload.rollout_percentage);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  next();
};

const closeCircuit = async (req, res, next) => {
  const { flagId } = req.params;
  const response = await db.updateFlag(flagId, { is_active: true });
  const payload = response.rows[0];
  payload.rollout_percentage = Number(payload.rollout_percentage);
  payload.error_threshold = Number(payload.error_threshold);
  req.flag = payload;
  next();
};

const returnCreatedFlag = (req, res) => {
  const flag = req.flag;
  res.status(201).json({ payload: flag });
};

const returnPatchedFlag = (req, res) => {
  const flag = req.flag;
  res.status(200).json({ payload: flag });
};

const returnDeletedFlag = (req, res) => {
  const flag = req.flag;
  res.status(200).json({ payload: flag.id });
};

const returnOpenedCircuit = (req, res) => {
  const flag = req.flag;
  res.status(200).json({ payload: flag.id });
};

const returnClosedCircuit = (req, res) => {
  const flag = req.flag;
  res.status(200).json({ payload: flag.id });
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
  returnPatchedFlag,
  returnDeletedFlag,
  returnOpenedCircuit,
  returnClosedCircuit,
};
