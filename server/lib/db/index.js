const pgtools = require('pgtools');


const dbInfo = {
  name: projectConfig.database,
  tablesSchema: {},
};

const updateConfig = (config) => {
  return {
    user: config.user || projectConfig.user,
    host: config.host || projectConfig.host,
    database: config.database || projectConfig.database,
    password: config.password || projectConfig.password,
    port: config.port || projectConfig.port,
  };
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
