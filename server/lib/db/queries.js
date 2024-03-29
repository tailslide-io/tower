const format = require('pg-format');
const joinTokens = (modifierKey, counts) => {
  return new Array(counts).fill(modifierKey).join(',');
};

// apps
const createApp = (title) => {
  return format(
    'INSERT INTO apps (title) VALUES (%L) RETURNING title, id, created_at;',
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
    'UPDATE apps SET title=%L WHERE id=%L RETURNING *;',
    title,
    appId
  );
};

const deleteApp = (appId) => {
  return format('DELETE FROM apps WHERE id=%L RETURNING *;', appId);
};

// flags
const getFlags = (appId) => {
  return format('SELECT * FROM flags WHERE app_id=%L;', appId);
};

const getFlag = (flagId) => {
  return format(
    `
    SELECT 
      f.id,
      f.title, 
      f.app_id, 
      f.description AS flag_description, 
      f.is_active, 
      f.rollout_percentage, 
      f.white_listed_users, 
      f.webhooks,
      f.error_threshold_percentage,
      f.circuit_status,
      f.is_recoverable,
      f.circuit_recovery_percentage,
      f.circuit_recovery_delay,
      f.circuit_initial_recovery_percentage,
      f.circuit_recovery_rate,
      f.circuit_recovery_increment_percentage,
      f.circuit_recovery_profile,
      f.created_at,
      f.updated_at,
      l.id AS log_id, 
      l.flag_id, 
      l.description AS log_description, 
      l.action_type,
      l.created_at AS log_created_at, 
      l.updated_at AS log_updated_at
        FROM flags f
        INNER JOIN logs l
          ON f.id = l.flag_id
        WHERE f.id=%L;
  `,
    flagId
  );
};

const getFlagWebhooksInfo = (flagId) => {
  return format(
    `
    SELECT 
      f.title AS flag_title,
      f.circuit_status,
      f.webhooks,
      a.title AS app_title
        FROM flags f
        INNER JOIN apps a
          ON f.app_id = a.id
        WHERE f.id=%L;
  `,
    flagId
  );
};

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
  const items = Object.entries(body);
  const counts = items.length;
  const updateFields = new Array(counts).fill('%I=%L').join(',');
  const updateValues = items.flat();

  let text = `UPDATE flags SET
    ${updateFields}
  WHERE id=%L RETURNING *;`;

  return format(text, ...updateValues, flagId);
};

const deleteFlag = (flagId) => {
  return format(`DELETE FROM flags WHERE id=%L RETURNING *;`, flagId);
};

// logs

const getLogs = (appId) => {
  return format(`SELECT * FROM logs WHERE app_id=%L;`, appId);
};

const getAllLogs = () => {
  return `SELECT       
  id AS log_id, 
  flag_id,
  flag_title,
  description AS log_description, 
  action_type,
  created_at, 
  updated_at FROM logs
  ORDER BY created_at DESC;`;
};

const createLog = (body) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  let text = `INSERT INTO logs (${joinTokens(
    '%I',
    keys.length
  )}) VALUES (${joinTokens('%L', values.length)}) RETURNING *;`;
  return format(text, ...keys, ...values);
};

// keys
const createKey = () => {
  return `DELETE FROM keys; INSERT INTO keys DEFAULT VALUES RETURNING *;`;
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
  getAllLogs,
  createLog,
  createKey,
  getKey,
  getFlagWebhooksInfo,
};
