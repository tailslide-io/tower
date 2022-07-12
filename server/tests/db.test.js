const { Client } = require('pg');
const pgtools = require('pgtools');

const {
  createDatabase,
  dropDatabase,
  projectConfig,
  dbExistsQuery,
} = require('../lib/db/setup/setupHelpers');

// connect to default "postgres" database first to create project_test database
const testDBName = projectConfig.database + '_test';
projectConfig.database = testDBName;
const defaultConfig = { ...projectConfig, database: 'postgres' };

let postgresClient;

const dropTestDb = async (client) => {
  let res = await client.query(dbExistsQuery(testDBName));
  if (res.rows.length > 0) {
    pgtools.dropdb(defaultConfig, testDBName);
  }
};

describe('Postgres database', () => {
  beforeEach(async () => {
    postgresClient = new Client(defaultConfig);
    await postgresClient.connect();
    await dropTestDb(postgresClient);
  });

  afterEach(async () => {
    postgresClient.end();
  });

  it('can initialize project database', async () => {
    let existsQuery = dbExistsQuery(testDBName);
    let res = await postgresClient.query(existsQuery);
    expect(res.rows.length).toBe(0);

    await createDatabase(projectConfig);
    res = await postgresClient.query(existsQuery);
    expect(res.rows.length).toBe(1);
  });

  it('can drop project database', async () => {
    await createDatabase(projectConfig);
    await dropDatabase(projectConfig);
    let res = await postgresClient.query(dbExistsQuery(testDBName));
    expect(res.rows.length).toBe(0);
  });
});
