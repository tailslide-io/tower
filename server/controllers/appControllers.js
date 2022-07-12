const db = require('../lib/db');

const createApp = async (req, res) => {
  const { title } = req.body;
  const response = await db.createApp(title);
  console.log(response.rows[0]);
  const payload = response.rows[0];
  res.status(201).json({ payload });
};

const getApps = async (req, res) => {
  const response = await db.getApps();
  console.log(response.rows);
  const payload = response.rows;
  res.status(200).json({ payload });
};

module.exports = {
  createApp,
  getApps,
};
