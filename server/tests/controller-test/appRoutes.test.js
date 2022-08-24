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
  endPoolConnection,
} = require('../../lib/db');

const { 
  getApps,
  getApp,
  createApp,
  updateApp,
  deleteApp
} = require('../../controllers/appControllers');

const initialApps = ['App 1', 'App 2']

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
})

afterEach(async () => {
  await dropTable(client, 'apps')
})

afterAll(async () => {
  await client.end();
  await endPoolConnection();
  await dropDatabase(projectConfig);
});

const noop = () => {}

test('getApps returns all apps', async () => {
  const mockRequest = {};
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await getApps(mockRequest, mockResponse)

  expect(responseObject.payload).toHaveLength(initialApps.length)
  expect(mockResponse.statusCode).toBe(200)
})

test('getApp returns an app by id', async () => {
  const appId = '1';
  const mockRequest = {
    params: { appId }
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await getApp(mockRequest, mockResponse)

  expect(responseObject.payload).toHaveProperty('id', 1)
  expect(responseObject.payload).toHaveProperty('title', 'App 1')
  expect(responseObject.payload).toHaveProperty('created_at')
  expect(responseObject.payload).toHaveProperty('updated_at')
  expect(mockResponse.statusCode).toBe(200)
})

test('createApp creates and returns a new app', async () => {
  const mockRequest = {
    body: { title: "New App" }
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await createApp(mockRequest, mockResponse)

  expect(responseObject.payload).toHaveProperty('title', 'New App')
  expect(responseObject.payload).toHaveProperty('id', 3)
  expect(responseObject.payload).toHaveProperty('created_at')
  expect(mockResponse.statusCode).toBe(201)
})

test('updateApp updates and returns an app by id', async () => {
  const mockRequest = {
    params: { appId: "1" },
    body: { title: "Updated App" }
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await updateApp(mockRequest, mockResponse)

  expect(responseObject.payload).toHaveProperty('title', 'Updated App')
  expect(responseObject.payload).toHaveProperty('id', 1)
  expect(responseObject.payload).toHaveProperty('created_at')
  expect(responseObject.payload).toHaveProperty('updated_at')
  expect(mockResponse.statusCode).toBe(200)
})

test('deleteApp deletes an app by id and returns it', async () => {
  const mockRequest = {
    params: { appId: "1" },
  };
  let responseObject = {};

  const mockResponse = {
    json: jest.fn().mockImplementation((result) => {
      responseObject = result;
    }),
    status: function(s) {this.statusCode = s; return this;}
  }

  await deleteApp(mockRequest, mockResponse, noop)

  expect(mockRequest.appId).toBe('1')
  expect(mockRequest.app).toHaveProperty('title')
  expect(mockRequest.app).toHaveProperty('created_at')
  expect(mockRequest.app).toHaveProperty('updated_at')
})