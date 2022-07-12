const db = require('../lib/db');

const createApp = async (req, res) => {
  const { title } = req.body;
  const response = await db.createApp(title);
  const payload = response.rows[0];
  res.status(201).json({ payload });
};

const getApps = async (req, res) => {
  const response = await db.getApps();
  const payload = response.rows;
  res.status(200).json({ payload });
};

const getApp = async (req, res) => {
  const { appId } = req.params;
  const response = await db.getApp(appId);
  const payload = response.rows[0];
  res.status(200).json({ payload });
};

const deleteApp = async (req, res) => {
  const { appId } = req.params;
  const response = await db.deleteApp(appId);
  const returnedAppId = response.rows[0];
  res.status(200).json({ appId: returnedAppId });
};

const updateApp = async (req, res) => {
  const { appId } = req.params;
  const { title } = req.body;
  const response = await db.updateApp(appId, title);
  const payload = response.rows[0];
  res.status(200).json({ payload });
};

module.exports = {
  createApp,
  getApps,
  getApp,
  deleteApp,
  updateApp,
};
