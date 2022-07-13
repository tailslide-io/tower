const { Client } = require('pg');

const {
  setupDatabase,
  createTable,
  dropDatabase,
  tableExistsQuery,
  projectConfig,
  schema,
} = require('../lib/db/setup/setupHelpers');

const {
  createApp,
  getApps,
  getApp,
  updateApp,
  deleteApp,
  endPoolConnection,
} = require('../lib/db');

let client;

beforeAll(async () => {
  await setupDatabase(projectConfig);
  client = new Client(projectConfig);
  await client.connect();
  await createTable(client, { name: 'apps', query: schema.apps });
});

afterAll(async () => {
  await client.end();
  await endPoolConnection();
  await dropDatabase(projectConfig);
});

describe('App table', () => {
  it('exists', async () => {
    let res = await client.query(tableExistsQuery('apps'));
    expect(res.rowCount).toBe(1);
  });

  it('can add app', async () => {
    let appTitle = 'app 1';
    let appCountQuery = `SELECT * FROM apps WHERE title = '${appTitle}'`;
    let res = await client.query(appCountQuery);
    expect(res.rowCount).toBe(0);

    res = await createApp(appTitle);
    res = await client.query(appCountQuery);
    expect(res.rowCount).toBe(1);
  });

  it('can get apps', async () => {});
});
