const { Pool } = require('pg');
const queries = require('./queries');

const pool = new Pool();

// app
const createApp = async (title) => {
  return await pool.query(queries.createApp(title));
};

const getApps = async () => {
  return await pool.query(queries.getApps());
};

const getApp = async (appId) => {
  return await pool.query(queries.getApp(appId));
};

const updateApp = async (appId, title) => {
  return await pool.query(queries.updateApp(appId, title));
};

const deleteApp = async (appId) => {
  return await pool.query(queries.deleteApp(appId));
};

// flags
const getFlags = async (appId) => {
  return await pool.query(queries.getFlags(appId));
};

const getFlag = async (flagId) => {
  return await pool.query(queries.getFlag(flagId));
};

const createFlag = async (body) => {
  return await pool.query(queries.createFlag(body));
};

const updateFlag = async (flagId, body) => {
  return await pool.query(queries.updateFlag(flagId, body));
};

const deleteFlag = async (flagId) => {
  return await pool.query(queries.deleteFlag(flagId));
};

//logs
const getLogs = async () => {
  return await pool.query(queries.getLogs());
};

const createLog = async (flagId, body) => {
  return await pool.query(queries.createLog(flagId, body));
};

// keys
const createKey = async () => {
  return await pool.query(queries.createKey());
};

const getKey = async () => {
  return await pool.query(queries.getKey());
};

module.exports = {
  createApp,
  getApps,
  getApp,
  updateApp,
  deleteApp,
  getFlags,
  getFlag,
  createFlag,
  deleteFlag,
  updateFlag,
  getLogs,
  createLog,
  createKey,
  getKey,
};
