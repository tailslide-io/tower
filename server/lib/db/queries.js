const format = require('pg-format');
const joinTokens = (modifierKey, counts) => {
  return new Array(counts).fill(modifierKey).join(',');
};

// app
const createApp = (title) => {
  return format(
    'INSERT INTO apps (title) VALUES (%L) RETURNING title, created_at;',
    title
  );
};

const getApps = () => {
  return 'SELECT * FROM apps;';
};

const getApp = (appId) => {
  return format('SELECT * FROM apps WHERE id=%L;', appId);
};

const updateApp = (appId, title) => {
  return format(
    'UPDATE apps SET title=%L WHERE id=%L RETURNING title, created_at, updated_at;',
    title,
    appId
  );
};

const deleteApp = (appId) => {
  return format('DELETE FROM apps WHERE id=%L RETURNING id;', appId);
};

// flags table
const getFlags = (appId) => {
  return format('SELECT * FROM flags WHERE app_id=%L;', appId);
};

const getFlag = (flagId) => {
  return format(
    `
    SELECT 
      f.title, 
      f.description AS flag_description, 
      f.is_active, 
      f.rollout, 
      f.white_listed_users, 
      f.error_threshold,
      l.id AS log_id, 
      l.flag_id, 
      l.description AS log_description, 
      l.created_at, 
      l.updated_at
        FROM flags f
        INNER JOIN logs l
          ON f.id = l.flag_id
        WHERE f.id=%L;
  `,
    flagId
  );
};
/*(f.title, f.description AS flag_description, f.is_active, f.rollout, f.white_listed_users, f.error_threshold,
            l.id AS log_id, l.flag_id, l.description AS log_description, l.created_at, l.updated_at)

*/

const createFlag = (body) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  let text = `INSERT INTO flags (${joinTokens(
    '%I',
    keys.length
  )}) VALUES (${joinTokens('%L', values.length)})
  RETURNING *;
  ;`;
  return format(text, ...keys, ...values);
};

const updateFlag = (flagId, body) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  let text = `UPDATE flags SET (${joinTokens(
    '%I',
    keys.length
  )}) = (${joinTokens('%L', values.length)})
  WHERE id=%L;`;
  return format(text, ...keys, ...values, flagId);
};

const deleteFlag = (flagId) => {
  return format(`DELETE FROM flags WHERE id=%L RETURNING id;`, flagId);
};

// logs

const getLogs = () => {
  return `SELECT * FROM logs;`;
};

const createLog = (body) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  let text = `INSERT INTO logs (${joinTokens(
    '%I',
    keys.length
  )}) VALUES (${joinTokens('%L', values.length)});`;
  return format(text, ...keys, ...values);
};

// keys
const createKey = () => {
  return `DELETE FROM keys; INSERT INTO keys DEFAULT VALUES;`;
};

const getKey = () => {
  return `SELECT * FROM keys;`;
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
