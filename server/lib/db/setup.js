require('dotenv').config();
const { Client } = require('pg');
const format = require('pg-format');
const schema = require('./schema');

const projectConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWD,
  port: Number(process.env.PGPORT),
};

const dbExistsQuery = (dbName) => {
  return {
    text: 'SELECT 1 FROM pg_database WHERE datname=$1;',
    values: [dbName],
  };
};

const setupDatabse = async (config = {}) => {
  try {
    await createdb(config);
    await createTables(config);
  } catch (err) {
    console.error(err);
  }
};

const createdb = async (config = {}) => {
  let defaultConfig = { ...config, database: 'postgres' };
  let postgresClient;
  let towerClient;
  const dbName = config.database;
  try {
    postgresClient = new Client(defaultConfig);
    await postgresClient.connect();
    let res = await postgresClient.query(dbExistsQuery(dbName));
    if (res.rows.length > 0) {
      throw new Error(`Failed to create database, ${dbName} already exists.`);
    }
    let query = format('CREATE DATABASE %I;', dbName);
    await postgresClient.query(query);
    towerClient = new Client(config);
    await towerClient.connect();
    await towerClient.query(schema.triggerSetTimestamp);
    await towerClient.query(schema.uuidExtension);
    await towerClient.query(schema.createActionsType);
  } catch (err) {
    console.error(err);
  } finally {
    if (postgresClient) {
      postgresClient.end();
    }
    if (towerClient) {
      towerClient.end();
    }
  }
};

const createTables = async (config) => {
  let client = new Client(config);

  try {
    await client.connect();
    const { flags, apps, logs, keys } = schema;
    const tables = [
      { name: 'apps', query: apps },
      { name: 'flags', query: flags },
      { name: 'logs', query: logs },
      { name: 'keys', query: keys },
    ];

    for await (const table of tables) {
      console.log('creating table', table.name);
      await createTable(client, table);
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
};

const createTable = async (client, table) => {
  await client.query(table.query);
  await client.query(format(schema.setTimestamp, table.name));
};

const dropDatabase = async (config) => {
  let defaultConfig = { ...config, database: 'postgres' };
  let dbName = config.database;
  let postgresClient = new Client(defaultConfig);
  try {
    await postgresClient.connect();
    let res = await postgresClient.query(dbExistsQuery(dbName));
    if (res.rows.length === 0) {
      throw new Error(`Failed to drop database, ${dbName} doesn't exist.`);
    }
    const query = format('DROP DATABASE %I;', dbName);
    await postgresClient.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    postgresClient.end();
  }
};

(async () => {
  await setupDatabse(projectConfig);
  await dropDatabase(projectConfig);
})();

module.exports = {
  setupDatabse,
  createdb,
  createTables,
  dropDatabase,
};
