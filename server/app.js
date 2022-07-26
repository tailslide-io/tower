require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');

let natsClient;
let redisClient;

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
  if (err.statusCode) {
    res.status(err.statusCode);
  }
  res.json({ error: err });
};

app.use(errorHandler);

const server = app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  natsClient = await require('./lib/nats');
  redisClient = await require('./lib/redis');
});

const cleanup = async () => {
  await endPoolConnection();
  natsClient.endConnection();
  redisClient.endConnection();
  server.close();
};

process.on('SIGINT', cleanup);
process.on('SIGBREAK', cleanup);
