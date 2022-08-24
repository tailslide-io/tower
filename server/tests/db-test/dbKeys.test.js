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
  createKey,
  getKey,
  endPoolConnection,
} = require('../../lib/db');

let client;

beforeAll(async () => {
  await setupDatabase(projectConfig);
  client = new Client(projectConfig);
  await client.connect();
});

beforeEach(async () => {
  await createTable(client, { name: 'keys', query: schema.keys });
})

afterEach(async () => {
  await dropTable(client, 'keys')
})

afterAll(async () => {
  await client.end();
  await endPoolConnection();
  await dropDatabase(projectConfig);
});

describe('SDK Key table', () => {
  it('exists', async () => {
    let res = await client.query(tableExistsQuery('keys'));
    expect(res.rowCount).toBe(1);
  });

  it('can create a key', async () => {
    let keyCountQuery = `SELECT * FROM keys;`;
    let res = await client.query(keyCountQuery);
    expect(res.rowCount).toBe(0);

    res = await createKey();
    res = await client.query(keyCountQuery);
    expect(res.rowCount).toBe(1);
  });

  it('can get key', async () => {
    let keyCountQuery = `SELECT * FROM keys;`;
    let res = await client.query(keyCountQuery);
    expect(res.rowCount).toBe(0);

    res = await createKey();

    res = await getKey()
    expect(res.rows[0]).toHaveProperty('id')
  })

});
