const db = require('../lib/db');
const HttpError = require('../models/httpError');

const validateTitle = (title) => title.trim().length > 0;

const createApp = async (req, res) => {
  const { title } = req.body;
  if (!validateTitle(title)) {
    throw new HttpError(
      'Title must contain at least one nonempty characters',
      400
    );
  }

  const response = await db.createApp(title);
  const payload = response.rows[0];
  res.status(201).json({ payload });
};

const getApps = async (req, res) => {
  const response = await db.getApps();
  const payload = response.rows;
  res.status(200).json({ payload });
};

const getAppById = async (req, res) => {
  const { appId } = req.params;
  const response = await db.getApp(appId);
  const payload = response.rows[0];
  res.status(200).json({ payload });
};

/*
payload:
  created_at: "2022-07-19T20:48:37.009Z"
  id: 6
  title: "Fourth App"
  updated_at: "2022-07-19T20:48:37.009Z"

*/

const deleteApp = async (req, res, next) => {
  const { appId } = req.params;
  const response = await db.deleteApp(appId);
  const returnedApp = response.rows[0];
  req.appId = appId;
  req.app = returnedApp;
  next()
};

const returnDeletedApp = (req, res)=>{
  res.status(200).json({ payload: req.app });
}

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
  getApp: getAppById,
  deleteApp,
  updateApp,
  returnDeletedApp
};
