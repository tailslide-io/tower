// update timestamps for updatedAt
const triggerUpdatedAtTimestamp = `
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $updatedat_stamp$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$updatedat_stamp$ LANGUAGE plpgsql;
`;

// %I here is for escaping SQL identifiers, using pg-format
const setTimestamp = `
CREATE OR REPLACE TRIGGER set_timestamp
BEFORE UPDATE ON %I
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();`;

const uuidExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
const createActionsType = `CREATE TYPE actions AS ENUM ('create', 'update', 'delete', 'flag_on', 'flag_off', 'circuit_open', 'circuit_close');
  CREATE TYPE circuit_states AS ENUM ('open', 'close', 'recovery');
  CREATE TYPE recovery_profile AS ENUM ('linear', 'exponential');`;

const setTimeZoneToUTC = "SET TIME ZONE 'UTC';";

// tables
// TODO: fix rollout valid number to be <= 1000
//       make rollout a type of integer
const apps = `
CREATE TABLE IF NOT EXISTS apps (
	id serial PRIMARY KEY,
	title varchar(255) NOT NULL UNIQUE,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW() 
  CHECK(length(trim(title))>0)
)
`;

const flags = `
CREATE TABLE IF NOT EXISTS flags (
	id serial PRIMARY KEY,
  app_id integer REFERENCES apps(id) ON DELETE CASCADE,
	title varchar(255) NOT NULL UNIQUE,
	description varchar NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT false,
  rollout_percentage integer NOT NULL DEFAULT 0,
  white_listed_users varchar NOT NULL DEFAULT '',
  error_threshold_percentage integer NOT NULL DEFAULT 0,
  circuit_status circuit_states NOT NULL DEFAULT 'open', 
  is_recoverable boolean NOT NULL DEFAULT false,
  circuit_recovery_percentage integer NOT NULL DEFAULT 0, 
  circuit_recovery_delay integer NOT NULL DEFAULT 100,
  circuit_initial_recovery_percentage integer NOT NULL DEFAULT 100,
  circuit_recovery_rate integer NOT NULL DEFAULT 100,
  circuit_recovery_increment_percentage integer NOT NULL DEFAULT 1,
  circuit_recovery_profile recovery_profile NOT NULL DEFAULT 'linear',
  webhooks varchar NOT NULL DEFAULT '',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW(),
  
  CHECK (rollout_percentage >= 0 AND rollout_percentage <= 1000),
  CHECK (error_threshold_percentage >= 0 AND error_threshold_percentage <= 1000),
  CHECK (circuit_initial_recovery_percentage >= 0 AND circuit_initial_recovery_percentage <= 1000),
  CHECK (circuit_recovery_percentage >= 0 AND circuit_recovery_percentage <= 1000),
  CHECK (circuit_recovery_increment_percentage >= 1 AND circuit_recovery_increment_percentage <= 1000),
  CHECK (circuit_recovery_delay >= 100),
  CHECK (circuit_recovery_rate >= 100)
)
`;

const logs = `
CREATE TABLE IF NOT EXISTS logs (
	id serial PRIMARY KEY,
  flag_id integer REFERENCES flags(id) ON DELETE SET NULL,
  app_id integer REFERENCES apps(id) ON DELETE CASCADE,
	description varchar NOT NULL DEFAULT '',
  action_type actions NOT NULL,
  flag_title varchar NOT NULL DEFAULT '',
  flag_description varchar NOT NULL DEFAULT '',
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW() 
)
`;

const keys = `
CREATE TABLE IF NOT EXISTS keys (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp NOT NULL DEFAULT NOW() 
)
`;

module.exports = {
  flags,
  apps,
  logs,
  keys,
  triggerUpdatedAtTimestamp,
  setTimestamp,
  uuidExtension,
  createActionsType,
  setTimeZoneToUTC,
};
