const format = require('pg-format');
const joinTokens = (modifierKey, counts) => {
  return new Array(counts).fill(modifierKey).join(',');
};

// app

// flags table

const getFlags = (appId) => {
  return format('SELECT * FROM flags WHERE app_id=%L;', appId);
};
const getFlag = (flagId) => {
  return format('SELECT * FROM flags WHERE id=%L;', flagId);
};

const createFlag = (body) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  let text = `INSERT INTO flags (${joinTokens('%I', keys.length)}) VALUES (${joinTokens('%L', values.length)})`;
  return format(text, ...keys, ...values);
};
const updateFlag = (flagId, body) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  let text = `UPDATE flags SET (${joinTokens('%I', keys.length)}) = (${joinTokens('%L', values.length)})
  WHERE id=%L`;
  return format(text, ...keys, ...values, flagId);
};

const deleteFlag = (flagId) => {
  return format(`DELETE FROM flags WHERE id=%L`, flagId);
};

// logs

// keys

module.exports = {
  getFlags,
  getFlag,
  createFlag,
  deleteFlag,
  updateFlag,
};
