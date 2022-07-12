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
  const payload = response.rows[0];
  res.status(200).json({ payload });
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
