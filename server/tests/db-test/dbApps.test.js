const { Client } = require('pg');

const {
  setupDatabase,
  createTable,
  dropDatabase,
  tableExistsQuery,
  projectConfig,
  schema,
  dropTable,
} = require('../../lib/db/setup/setupHelpers');

const {
  createApp,
  getApps,
  getApp,
  updateApp,
  deleteApp,
  endPoolConnection,
} = require('../../lib/db');

let client;

beforeAll(async () => {
  await setupDatabase(projectConfig);
  client = new Client(projectConfig);
  await client.connect();
});

beforeEach(async () => {
  await createTable(client, { name: 'apps', query: schema.apps });
})

afterEach(async () => {
  await dropTable(client, 'apps')
})

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

  it('can get all apps', async () => {
    let appTitle1 = 'app 1';
    let appTitle2 = 'app 2';
    let appCountQuery = 'SELECT * FROM apps';
    let res = await client.query(appCountQuery);
    expect(res.rowCount).toBe(0);

    res = await createApp(appTitle1);
    res = await createApp(appTitle2)
    res = await getApps()
    expect(res.rowCount).toBe(2);
  })

  it('can get app by id', async () => {
    let appId = '1';
    let appTitle = 'new app';

    let res = await createApp(appTitle);

    res = await getApp(appId)
    expect(res.rows[0].title).toBe('new app')
  })

  it('can update app title', async () => {
    let appId = '1';
    let appTitle = 'new app';

    let res = await createApp(appTitle);

    res = await getApp(appId)
    expect(res.rows[0].title).toBe('new app')

    let newTitle = 'updated app';
    res = await updateApp(appId, newTitle)
    expect(res.rows[0].title).toBe('updated app')
  })

  it('can delete an app', async () => {
    let appTitle = 'app 1';
    let appId = '1';
    let appCountQuery = 'SELECT * FROM apps';
    let res = await client.query(appCountQuery);
    expect(res.rowCount).toBe(0);

    res = await createApp(appTitle);
    res = await client.query(appCountQuery)
    expect(res.rowCount).toBe(1);

    res = await deleteApp(appId)
    res = await client.query(appCountQuery)
    expect(res.rowCount).toBe(0);
  });
});
