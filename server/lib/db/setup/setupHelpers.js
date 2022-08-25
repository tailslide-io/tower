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

const tableExistsQuery = (tableName) => {
  return {
    text: 'SELECT 1 FROM information_schema.tables WHERE table_name=$1',
    values: [tableName],
  };
};

const clearTableQuery = (tableName) => {
  return `DELETE FROM ${tableName}`
}

const setupDatabseAndTables = async (config = projectConfig) => {
  try {
    let isNew = await setupDatabase(config);
    if (isNew) {
      await createTables(config);
    }
  } catch (err) {
    console.error(err);
  }
};

const setupDatabase = async (config) => {
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
    await postgresClient.end();
  }
};

const initializeDatabase = async (config) => {
  let towerClient = new Client(config);
  try {
    await towerClient.connect();
    await towerClient.query(schema.triggerUpdatedAtTimestamp);
    await towerClient.query(schema.uuidExtension);
    await towerClient.query(schema.createActionsType);
    await towerClient.query(schema.setTimeZoneToUTC);
  } catch (err) {
    console.error(err);
  } finally {
    await towerClient.end();
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
      await createTable(client, table);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

const createTable = async (client, table) => {
  // console.log('Creating table', table.name);
  await client.query(table.query);
  await client.query(format(schema.setTimestamp, table.name));
};

const dropTable = async (client, name) => {
  // console.log('Dropping table', name)
  await client.query(`DROP TABLE ${name}`)
}

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
    await postgresClient.end();
  }
};

module.exports = {
  setupDatabseAndTables,
  setupDatabase,
  createDatabase,
  initializeDatabase,
  createTables,
  createTable,
  dropTable,
  dropDatabase,
  projectConfig,
  dbExistsQuery,
  tableExistsQuery,
  clearTableQuery,
  schema,
};
