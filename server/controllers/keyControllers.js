const db = require('../lib/db');

const createKey = async (req, res) => {
  const responses = await db.createKey();
  const payload = responses[1].rows[0];
  res.status(201).json({ payload });
};
const getKey = async (req, res) => {
  const response = await db.getKey();
  const payload = response.rows[0];
  res.status(200).json({ payload });
};

module.exports = {
  createKey,
  getKey,
};
