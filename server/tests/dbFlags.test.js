const { Client } = require('pg');

const {
  setupDatabase,
  createTable,
  dropDatabase,
  tableExistsQuery,
  projectConfig,
  schema,
  dropTable,
} = require('../lib/db/setup/setupHelpers');

const {
  createApp,
  createFlag,
  getFlags,
  getFlag,
  deleteFlag,
  updateFlag,
  createLog,
  endPoolConnection,
} = require('../lib/db');

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

describe('Flags table', () => {
  it('exists', async () => {
    let res = await client.query(tableExistsQuery('flags'));
    expect(res.rowCount).toBe(1);
  });

  it('can add flag', async () => {
    let newFlag = {
      app_id: '1',
      title: 'new flag'
    }
    let flagCountQuery = `SELECT * FROM flags WHERE title = '${newFlag.title}'`;
    let res = await client.query(flagCountQuery);
    expect(res.rowCount).toBe(0);

    res = await createFlag(newFlag);
    res = await client.query(flagCountQuery);
    expect(res.rowCount).toBe(1);
  });

  it('can get all flags in app', async () => {
    let appId = '1';
    let newFlag1 = {
      app_id: '1',
      title: 'new flag'
    }
    let newFlag2 = {
      app_id: '1',
      title: 'new flag 2'
    }

    let res = await getFlags(appId);
    expect(res.rowCount).toBe(0);

    res = await createFlag(newFlag1);
    res = await createFlag(newFlag2);

    res = await getFlags(appId);;
    expect(res.rowCount).toBe(2);
  });

  it('can get a flag by id', async () => {
    let flagId = '1';

    let newFlag = {
      app_id: '1',
      title: 'new flag'
    }

    // Simulating flag creation log being created when flag is created
    // A log must exist for getFlag query to return a value
    let newFlagLog = {
      flag_id: flagId,
      app_id: newFlag.app_id,
      flag_title: newFlag.title,
      description: 'Flag Created',
      action_type: 'create',
    };

    let res = await createFlag(newFlag);
    res = await createLog(newFlagLog)

    res = await getFlag('1');
    expect(res.rows[0].title).toBe('new flag');
  });

  it('can update a flag by id', async () => {
    let appId = '1';
    let flagId = '1';

    let newFlag = {
      app_id: '1',
      title: 'new flag'
    }

    let res = await createFlag(newFlag);
    res = await getFlags(appId)
    expect(res.rows[0].title).toBe('new flag')

    let updatedFlag = {
      title: 'updated flag'
    }

    res = await updateFlag(flagId, updatedFlag);
    res = await getFlags(appId)
    expect(res.rows[0].title).toBe('updated flag')
  })

  it('can delete a flag by id', async () => {
    let flagId = '1';
    let appId = '1';

    let newFlag = {
      app_id: '1',
      title: 'new flag'
    }

    let res = await createFlag(newFlag);
    res = await getFlags(appId)
    expect(res.rowCount).toBe(1)

    res = await deleteFlag(flagId)
    res = await getFlags(appId)
    expect(res.rowCount).toBe(0)
  })

});
