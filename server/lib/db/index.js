const pgtools = require('pgtools');

const { Pool } = require('pg');
const pool = new Pool();
const queries = require('./queries');

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

module.exports = {
  getFlags,
  getFlag,
  createFlag,
  updateFlag,
  deleteFlag,
};

// const dropdb = (config, dbName) => {
//   config = updateConfig(config);
//   return pgtools
//     .dropdb(config, dbName)
//     .then((res) => {
//       console.log(`Deleted database ${dbName}, ${res}`);
//     })
//     .catch((err) => console.error(err));
// };

// db.query(yourQuerString, [params])
