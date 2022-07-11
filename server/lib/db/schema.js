// update timestamps for updatedAt
const triggerSetTimestamp = `
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $updatedat_stamp$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$updatedat_stamp$ LANGUAGE plpgsql;
`;

// %I here is for escaping SQL identifiers, using pg-format
const setTimestamp = `
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON %I
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();`;

const uuidExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

// tables
const flags = `
CREATE TABLE IF NOT EXISTS flags (
	id serial PRIMARY KEY,
  app_id integer REFERENCES apps(id),
	title varchar(255) NOT NULL UNIQUE,
	description varchar NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT false,
  rollout NUMERIC(4,0) NOT NULL DEFAULT 0,
  white_listed_users varchar NOT NULL DEFAULT '',
  error_threshold DECIMAL(4,1) NOT NULL DEFAULT 0.0,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW()
)
`;

const apps = `
CREATE TABLE IF NOT EXISTS apps (
	id serial PRIMARY KEY,
	title varchar(255) NOT NULL UNIQUE,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW() 
)
`;

const logs = `
CREATE TYPE actions AS ENUM ('create', 'update', 'delete', 'circuitOpen', 'circuitClose');

CREATE TABLE IF NOT EXISTS logs (
	id serial PRIMARY KEY,
  flag_id integer REFERENCES flags(id),
	description varchar NOT NULL DEFAULT '',
  action_type actions NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW() 
)
`;

const keys = `
CREATE TABLE IF NOT EXISTS keys (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW() 
)
`;

module.exports = {
  flags,
  apps,
  logs,
  keys,
  triggerSetTimestamp,
  setTimestamp,
  uuidExtension,
};
