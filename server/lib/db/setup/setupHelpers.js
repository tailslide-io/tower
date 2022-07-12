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

const setupDatabseAndTables = async (config = projectConfig) => {
  try {
    let isNew = await setupDatabse(config);
    if (isNew) {
      await createTables(config);
    }
  } catch (err) {
    console.error(err);
  }
};

const setupDatabse = async (config) => {
  try {
    let isNew = await createDatabase(config);
    if (isNew) {
      await initializeDatabase(config);
    }
    return isNew;
  } catch (err) {
    console.error(err);
  }
};

const createDatabase = async (config) => {
  let defaultConfig = { ...config, database: 'postgres' };
  let postgresClient = new Client(defaultConfig);
  const dbName = config.database;
  try {
    await postgresClient.connect();
    let res = await postgresClient.query(dbExistsQuery(dbName));
    if (res.rows.length > 0) {
      return false;
    }
    let query = format('CREATE DATABASE %I;', dbName);
    await postgresClient.query(query);
    console.log(`Creating database ${dbName}`);
    return true;
  } catch (err) {
    console.error(err);
  } finally {
    postgresClient.end();
  }
};

const initializeDatabase = async (config) => {
  let towerClient = new Client(config);
  try {
    await towerClient.connect();
    await towerClient.query(schema.triggerUpdatedAtTimestamp);
    await towerClient.query(schema.uuidExtension);
    await towerClient.query(schema.createActionsType);
  } catch (err) {
    console.error(err);
  } finally {
    towerClient.end();
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
    const query = format('DROP DATABASE IF EXISTS %I;', dbName);
    await postgresClient.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    postgresClient.end();
  }
};

module.exports = {
  setupDatabseAndTables,
  setupDatabse,
  createDatabase,
  initializeDatabase,
  createTables,
  createTable,
  dropDatabase,
  projectConfig,
  dbExistsQuery,
};
