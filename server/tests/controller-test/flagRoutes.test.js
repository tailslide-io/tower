const { Client } = require('pg');

let client;

const {
  setupDatabase,
  createTable,
  dropDatabase,
  projectConfig,
  schema,
  dropTable,
} = require('../../lib/db/setup/setupHelpers');

const {
  createApp: createAppDB,
  createFlag: createFlagDB,
  createLog: createLogDB,
  endPoolConnection,
} = require('../../lib/db');

const { 
  getFlag,
  getFlags,
  createFlag,
  updateFlag,
  deleteFlag
} = require('../../controllers/flagControllers');

const initialApps = ['App 1']
const initialFlags = ['Flag 1', 'Flag 2']

beforeAll(async () => {
  await setupDatabase(projectConfig);
  client = new Client(projectConfig);
  await client.connect();
})

beforeEach(async () => {
  await createTable(client, { name: 'apps', query: schema.apps });
  for (const app of initialApps) {
    await createAppDB(app)
  }
  await createTable(client, { name: 'flags', query: schema.flags });
  for (const flag of initialFlags) {
    await createFlagDB({ app_id: '1', title: flag })
  }
  await createTable(client, { name: 'logs', query: schema.logs });
  for (const flag of initialFlags) {
    await createLogDB({
      flag_id: flag[flag.length - 1],
      app_id: '1',
      action_type: 'create'
    })
  }
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

const noop = () => {}

test('getFlags returns all flags', async () => {
  const mockRequest = {
    params: { appId: '1' }
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await getFlags(mockRequest, mockResponse)

  expect(responseObject.payload).toHaveLength(initialFlags.length)
  expect(mockResponse.statusCode).toBe(200)
})

test('getFlag returns flag by id with logs and all formatted default properties', async () => {
  const flagId = '1';
  const mockRequest = {
    params: { flagId }
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await getFlag(mockRequest, mockResponse)

  expect(responseObject.payload).toHaveProperty('id', 1)
  expect(responseObject.payload).toHaveProperty('title', 'Flag 1')
  expect(responseObject.payload).toHaveProperty('app_id', 1)
  expect(responseObject.payload).toHaveProperty('is_active', false)
  expect(responseObject.payload).toHaveProperty('description', '')
  expect(responseObject.payload).toHaveProperty('rollout_percentage', 0)
  expect(responseObject.payload).toHaveProperty('white_listed_users', '')
  expect(responseObject.payload).toHaveProperty('webhooks', '')
  expect(responseObject.payload).toHaveProperty('circuit_status', 'open')
  expect(responseObject.payload).toHaveProperty('is_recoverable', false)
  expect(responseObject.payload).toHaveProperty('error_threshold_percentage', 0)
  expect(responseObject.payload).toHaveProperty('circuit_recovery_percentage', 0)
  expect(responseObject.payload).toHaveProperty('circuit_recovery_delay', 100)
  expect(responseObject.payload).toHaveProperty('circuit_initial_recovery_percentage', 10)
  expect(responseObject.payload).toHaveProperty('circuit_recovery_rate', 100)
  expect(responseObject.payload).toHaveProperty('circuit_recovery_increment_percentage', 0.1)
  expect(responseObject.payload).toHaveProperty('circuit_recovery_profile', 'linear')
  expect(responseObject.payload).toHaveProperty('created_at')
  expect(responseObject.payload).toHaveProperty('updated_at')
  expect(responseObject.payload).toHaveProperty('logs')
  expect(responseObject.payload.logs).toHaveLength(1)
  expect(mockResponse.statusCode).toBe(200)
})

test('createFlag creates and returns a new flag with all default formatted properties', async () => {
  const appId = '1';
  const mockRequest = {
    params: { appId },
    body: { title: 'New Flag' }
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await createFlag(mockRequest, mockResponse, noop)

  expect(mockRequest.flag).toHaveProperty('id', 3)
  expect(mockRequest.flag).toHaveProperty('title', 'New Flag')
  expect(mockRequest.flag).toHaveProperty('app_id', 1)
  expect(mockRequest.flag).toHaveProperty('is_active', false)
  expect(mockRequest.flag).toHaveProperty('description', '')
  expect(mockRequest.flag).toHaveProperty('rollout_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('white_listed_users', '')
  expect(mockRequest.flag).toHaveProperty('webhooks', '')
  expect(mockRequest.flag).toHaveProperty('circuit_status', 'open')
  expect(mockRequest.flag).toHaveProperty('is_recoverable', false)
  expect(mockRequest.flag).toHaveProperty('error_threshold_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_delay', 100)
  expect(mockRequest.flag).toHaveProperty('circuit_initial_recovery_percentage', 10)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_rate', 100)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_increment_percentage', 0.1)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_profile', 'linear')
  expect(mockRequest.flag).toHaveProperty('created_at')
  expect(mockRequest.flag).toHaveProperty('updated_at')
})

test('updateFlag updates and returns a flag by id', async () => {
  const flagId = '1';
  const mockRequest = {
    params: { flagId },
    body: { title: 'Updated Flag' }
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await updateFlag(mockRequest, mockResponse, noop)

  expect(mockRequest.flag).toHaveProperty('id', 1)
  expect(mockRequest.flag).toHaveProperty('title', 'Updated Flag')
  expect(mockRequest.flag).toHaveProperty('app_id', 1)
  expect(mockRequest.flag).toHaveProperty('is_active', false)
  expect(mockRequest.flag).toHaveProperty('description', '')
  expect(mockRequest.flag).toHaveProperty('rollout_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('white_listed_users', '')
  expect(mockRequest.flag).toHaveProperty('webhooks', '')
  expect(mockRequest.flag).toHaveProperty('circuit_status', 'open')
  expect(mockRequest.flag).toHaveProperty('is_recoverable', false)
  expect(mockRequest.flag).toHaveProperty('error_threshold_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_delay', 100)
  expect(mockRequest.flag).toHaveProperty('circuit_initial_recovery_percentage', 10)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_rate', 100)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_increment_percentage', 0.1)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_profile', 'linear')
  expect(mockRequest.flag).toHaveProperty('created_at')
  expect(mockRequest.flag).toHaveProperty('updated_at')
})

test('deleteFlag deletes a flag by id and returns it', async () => {
  const flagId = '1';
  const mockRequest = {
    params: { flagId },
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await deleteFlag(mockRequest, mockResponse, noop)

  expect(mockRequest.flag).toHaveProperty('id', 1)
  expect(mockRequest.flag).toHaveProperty('title', 'Flag 1')
  expect(mockRequest.flag).toHaveProperty('app_id', 1)
  expect(mockRequest.flag).toHaveProperty('is_active', false)
  expect(mockRequest.flag).toHaveProperty('description', '')
  expect(mockRequest.flag).toHaveProperty('rollout_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('white_listed_users', '')
  expect(mockRequest.flag).toHaveProperty('webhooks', '')
  expect(mockRequest.flag).toHaveProperty('circuit_status', 'open')
  expect(mockRequest.flag).toHaveProperty('is_recoverable', false)
  expect(mockRequest.flag).toHaveProperty('error_threshold_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_percentage', 0)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_delay', 100)
  expect(mockRequest.flag).toHaveProperty('circuit_initial_recovery_percentage', 100)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_rate', 100)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_increment_percentage', 1)
  expect(mockRequest.flag).toHaveProperty('circuit_recovery_profile', 'linear')
  expect(mockRequest.flag).toHaveProperty('created_at')
  expect(mockRequest.flag).toHaveProperty('updated_at')
})