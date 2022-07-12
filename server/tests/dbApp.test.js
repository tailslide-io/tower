const { Client } = require('pg');

const {
  setupDatabase,
  createTable,
  dropDatabase,
  dbExistsQuery,
  tableExistsQuery,
  projectConfig,
  setupDatabseAndTables,
  createDatabase,
} = require('../lib/db/setup/setupHelpers');

const testDBName = projectConfig.database + '_test';
projectConfig.database = testDBName;

let client;

beforeAll(async () => {
  await createDatabase(projectConfig);
  client = new Client(projectConfig);
  await client.connect();
});

afterAll(async () => {
  await dropDatabase(projectConfig);
  await client.end();
});

describe('App table', () => {
  it('exists', async () => {
    let res = await client.query(tableExistsQuery('apps'));
    expect(res.rowCount).toBe(0);
  });
});
