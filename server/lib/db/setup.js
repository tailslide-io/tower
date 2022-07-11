require('dotenv').config();
const { config } = require('dotenv');
const { Pool, Client } = require('pg');
const pgtools = require('pgtools');
const pg = require('pg');
const format = require('pg-format');
const schema = require('./schema');

const projectConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWD,
  port: Number(process.env.PGPORT),
};

const updateConfig = (config = {}) => {
  return {
    user: config.user || projectConfig.user,
    host: config.host || projectConfig.host,
    database: config.database || projectConfig.database,
    password: config.password || projectConfig.password,
    port: config.port || projectConfig.port,
  };
};

const createdb = (config = {}) => {
  // config = updateConfig(config);
  // DO NOT PUT database field in config object, or only use "postgres"
  config = {
    user: 'postgres',
    database: 'postgres',
    password: '',
    port: 5432,
    host: 'localhost',
  };
  console.log(config);
  // const dbName = config.database;
  const dbName = 'tower';
  return pgtools
    .createdb(config, dbName)
    .then(async (res) => {
      let client = new Client();
      await client.connect();
      await client.query(schema.uuidExtension);
      await client.end();
      console.log(`Created database ${dbName}, ${res}`);
    })
    .catch((err) => console.error(err));
  // let defaultConfig = { ...config, database: 'postgres' };

  // pool.connect(defaultConfig, function (err, client, done) {
  //   // connect to postgres db
  //   if (err) {
  //     console.log('Error while connecting: ' + err);
  //   }
  //   client.query('CREATE DATABASE ' + dbName, function (err) {
  //     // create user's db
  //     if (err) {
  //       console.log('ignoring the error'); // ignore if the db is there
  //     }
  //     client.end(); // close the connection

  //     // create a new connection to the new db
  //     pool.connect(config, function (err, clientOrg, done) {
  //       // create the table
  //       clientOrg.query(
  //         'CREATE TABLE IF NOT EXISTS ' + tableName + ' ' + '(...some sql...)'
  //       );
  //     });
  //   });
  // });
};

let pool;
const setupTables = async (config) => {
  config = updateConfig(config);
  pool = new Pool(config);
  const { flags, apps, logs, keys } = schema;
  const tables = [
    { name: 'apps', query: apps },
    { name: 'flags', query: flags },
    { name: 'logs', query: logs },
    { name: 'keys', query: keys },
  ];

  for (const table of tables) {
    await setupTable(pool, table);
  }
};

const setupTable = async (pool, table) => {
  await pool.query(table.query);
  // await pool.query(format(schema.setTimestamp, table.name));
};

(async () => {
  await createdb();
  await setupTables();
  pool.end();
})();

module.exports = {
  createdb,
  setupTables,
};
