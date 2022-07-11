const pgtools = require('pgtools');

const projectConfig = {
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'tower',
  password: process.env.PGPASSWD || '',
  port: Number(process.env.PGPORT) || 5432,
};

const dbInfo = {
  name: projectConfig.database,
  tablesSchema: {},
};

// tower_test,
const updateConfig = (config) => {
  return {
    user: config.user || projectConfig.user,
    host: config.host || projectConfig.host,
    database: config.database || projectConfig.database,
    password: config.password || projectConfig.password,
    port: config.port || projectConfig.port,
  };
};

const createdb = (config, dbName) => {
  config = updateConfig(config);
  return pgtools
    .createdb(config, dbName)
    .then((res) => {
      console.log(`Created database ${dbName}, ${res}`);
    })
    .catch((err) => console.error(err));
};

const dropdb = (config, dbName) => {
  config = updateConfig(config);
  return pgtools
    .dropdb(config, dbName)
    .then((res) => {
      console.log(`Deleted database ${dbName}, ${res}`);
    })
    .catch((err) => console.error(err));
};

module.exports = { projectConfig, updateConfig, dbInfo, createdb, dropdb };
