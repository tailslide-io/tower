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
  createFlag,
  getAllLogs,
  createLog,
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
  await createApp('test app')
  await createTable(client, { name: 'flags', query: schema.flags });
  await createFlag({ app_id: '1', title: 'test flag' })
  await createTable(client, { name: 'logs', query: schema.logs });
})

afterEach(async () => {
  await dropTable(client, 'logs')
  await dropTable(client, 'flags')
  await dropTable(client, 'apps')
})

afterAll(async () => {
  await client.end();
  await endPoolConnection();
  await dropDatabase(projectConfig);
});

describe('Logs table', () => {
  it('exists', async () => {
    let res = await client.query(tableExistsQuery('logs'));
    expect(res.rowCount).toBe(1);
  });

  it('can create log', async () => {
    let flagTitle = 'test flag'

    let newFlagLog = {
      flag_id: '1',
      app_id: '1',
      flag_title: flagTitle,
      description: 'Flag Created',
      action_type: 'create',
    };

    let logCountQuery = `SELECT * FROM logs;`;
    let res = await client.query(logCountQuery);
    expect(res.rowCount).toBe(0);

    res = await createLog(newFlagLog)

    expect(res.rowCount).toBe(1);
  });

  it('can get all logs', async () => {
    let flagTitle = 'test flag'

    let newFlagLog1 = {
      flag_id: '1',
      app_id: '1',
      flag_title: flagTitle,
      description: 'Flag Created',
      action_type: 'create',
    };

    let newFlagLog2 = {
      flag_id: '1',
      app_id: '1',
      flag_title: flagTitle,
      description: 'Flag Updated',
      action_type: 'update',
    };

    let res = await createLog(newFlagLog1)
    res = await createLog(newFlagLog2)

    res = await getAllLogs();
    expect(res.rowCount).toBe(2);
  });

});
