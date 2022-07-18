require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const apiRoutes = require('./routes/api');
const { endPoolConnection } = require('./lib/db');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  return res.json({ test: 'connected' });
});

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.json({ error: err });
};

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const cleanup = async () => {
  await endPoolConnection();
  console.log('database connection closed');
  server.close();
};

(async () => {
  await require('./lib/nats');
})();

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
