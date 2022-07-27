const db = require('../lib/db');
const {
  formatPercentagesInData,
  formatPercentagesInBody,
} = require('../lib/utils');

const getFlags = async (req, res) => {
  const appId = req.params.appId;
  const response = await db.getFlags(appId);
  const payload = response.rows;
  const formattedPayload = payload.map(formatPercentagesInData);
  res.status(200).json({ payload: formattedPayload });
};

const getFlag = async (req, res) => {
  const flagId = req.params.flagId;
  const response = await db.getFlag(flagId);
  const item = formatPercentagesInData(response.rows[0]);

  const flagData = {
    id: item.id,
    title: item.title,
    app_id: item.app_id,
    is_active: item.is_active,
    description: item.flag_description,
    rollout_percentage: item.rollout_percentage,
    white_listed_users: item.white_listed_users,
    webhooks: item.webhooks,
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
    created_at: item.created_at,
    updated_at: item.updated_at,
  };

  const logsData = response.rows.map((row) => {
    return {
      log_id: row.log_id,
      flag_id: row.flag_id,
      log_description: row.log_description,
      action_type: row.action_type,
      created_at: row.log_created_at,
      updated_at: row.log_updated_at,
    };
  });
  flagData.logs = logsData;
  res.status(200).json({ payload: flagData });
};

const alignFlagStatusAndCircuitStatus = (data) => {
  if (data.is_active) {
    data.circuit_status = 'close';
  } else {
    data.circuit_status = 'open';
  }
};

const createFlag = async (req, res, next) => {
  const appId = Number(req.params.appId);
  const data = { ...req.body, app_id: appId };
  alignFlagStatusAndCircuitStatus(data);
  const formattedData = formatPercentagesInBody(data);
  const response = await db.createFlag(formattedData);
  const payload = response.rows[0];
  const formattedPayload = formatPercentagesInData(payload);
  req.flag = formattedPayload;
  next();
};

const updateFlag = async (req, res, next) => {
  const flagId = Number(req.params.flagId);
  const data = formatPercentagesInBody(req.body);
  alignFlagStatusAndCircuitStatus(data);
  const response = await db.updateFlag(flagId, data);
  const payload = response.rows[0];
  const formattedPayload = formatPercentagesInData(payload);
  req.flag = formattedPayload;
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
  const formattedPayload = formatPercentagesInData(payload);
  req.flag = formattedPayload;
  next();
};

const closeCircuit = async (req, res, next) => {
  const { flagId } = req.params;
  const response = await db.updateFlag(flagId, { is_active: true });
  const payload = response.rows[0];
  const formattedPayload = formatPercentagesInData(payload);
  req.flag = formattedPayload;
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

const getFlagTimeSeriesData = async (req, res) => {
  const flagId = req.params.flagId;
  const timeRange = Number(req.query.timeRange);
  const timeBucket = Number(req.query.timeBucket);
  const redisClient = await require('../lib/redis');
  const result = await redisClient.queryTimeWindow(
    flagId,
    timeRange,
    timeBucket
  );
  res.json({ payload: result });
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
  getFlagTimeSeriesData,
};
