require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');
let natsClient;

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

const server = app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  natsClient = await require('./lib/nats');
});

const cleanup = async () => {
  await endPoolConnection();
  console.log('database connection closed');
  natsClient.endConnection();
  server.close();
};

process.on('SIGINT', cleanup);
process.on('SIGBREAK', cleanup);
