require('dotenv').config();
const { config } = require('dotenv');
const { Pool } = require('pg');
const pgtools = require('pgtools');

const { createdb, dropdb, projectConfig, dbInfo } = require('../lib/db');

// connect to default "postgres" database first to create project_test database
const testDBName = projectConfig.database + '_test';
const testConfig = { ...projectConfig, database: 'postgres' };

const dbExistsQuery = {
  text: 'SELECT 1 FROM pg_database WHERE datname=$1;',
  values: [testDBName],
};

const pool = new Pool(testConfig);

const createTestDb = async () => createdb(testConfig, testDBName);

const dropTestDb = async () => {
  let res = await pool.query(dbExistsQuery);
  if (res.rows.length > 0) {
    pgtools.dropdb(testConfig, testDBName);
  }
};

describe('Postgres database', () => {
  beforeAll(() => {
    dropTestDb();
  });

  afterEach(() => {
    dropTestDb();
  });

  afterAll(() => {
    pool.end();
  });

  it('can initialize project database', async () => {
    let res = await pool.query(dbExistsQuery);
    expect(res.rows.length).toBe(0);

    await createTestDb();
    res = await pool.query(dbExistsQuery);
    expect(res.rows.length).toBe(1);
  });

  it('can drop project database', async () => {
    await createTestDb();
    await dropdb(testConfig, testDBName);
    let res = await pool.query(dbExistsQuery);
    expect(res.rows.length).toBe(0);
  });
});
