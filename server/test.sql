CREATE TABLE IF NOT EXISTS flags {
	id serial PRIMARY KEY,
  appId integer REFERENCES apps(id)
	title varchar(255) NOT NULL UNIQUE,
	description varchar NOT NULL DEFAULT '',
  isActive boolean NOT NULL DEFAULT false,
  rollout integer NOT NULL DEFAULT 0,
  whiteListedUsers varchar NOT NULL DEFAULT '',
  errorThreshold DECIMAL(4,1) NOT NULL DEFAULT 0.0,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  updatedAt timestamp NOT NULL DEFAULT NOW() 
  CHECK (rollout BETWEEEN 0 AND 1000)
}
