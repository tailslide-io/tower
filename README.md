# Tower 
To run locally

Clone main branch of repository

Sample `.env` file to add into the server directory

```
PORT=3001

PGHOST='localhost'
PGUSER='postgres'
PGDATABASE='tower'
PGPASSWORD='secret'
PGPORT=5432

NATS_SERVER='nats://127.0.0.1:4222'
SDK_KEY='myToken'
```

Sample `.env` file to add into the client directory
```
REACT_APP_NATS_WS_SERVER='ws://0.0.0.0:8080'
REACT_APP_SDK_KEY='myToken'
```

## Start NATS Jetstream
Install [NATS](https://docs.nats.io/running-a-nats-service/introduction/installation) \
From Tower root directory in separate terminal run `nats-server -c nats.conf`

*to stop a nats server run `nats-server --signal quit`*\
*to delete stream messages run `nats stream purge`*
<br>

## Start Redis Time Series Database
Install [Redis](https://redis.io/docs/stack/timeseries/quickstart/) \
From any directory in separate terminal run `docker run -p 6379:6379 -it --rm redislabs/redistimeseries`
<br>

## Start PostgreSQL Database
Install [PostgreSQL](https://www.postgresql.org/download/) \
From any directory run `brew services start postgresql`
<br>

## Start Backend
From the server directory `npm install`\
From the server directory run `npm run dev`\
The backend app is now available at `http://localhost:3001`
<br>

## Start Frontend
From the server directory `npm install`\
From the server directory run `npm start`\
The frontend app is now available at `http://localhost:3000`
<br>

---
## API Endpoints
All requests and responses are in json

### Apps 
#### `GET /apps`
Returns all apps

Example Response:

```json
{
  "payload": [
    {
      "id": 1,
      "title": "First app",
      "created_at": "2022-08-11T18:13:55.106Z",
      "updated_at": "2022-08-11T18:13:55.106Z"
    },
    {
      "id": 2,
      "title": "Second App",
      "created_at": "2022-08-11T18:27:17.068Z",
      "updated_at": "2022-08-11T18:27:17.068Z"
    }
  ]
}
```
<br>


#### `GET apps/:appId`
Returns the app with a matching `appId`

Example Response:

```json
{
  "payload": {
    "id": 2,
    "title": "Second App",
    "created_at": "2022-08-11T18:27:17.068Z",
    "updated_at": "2022-08-11T18:27:17.068Z"
  }
}
```
<br>

#### `POST /apps`
Creates a new app

Example Request:

```json
{
  "title": "First App"
}
```

Example Response:

```json
{
  "payload": {
    "title": "First App",
    "id": 1,
    "created_at": "2022-08-11T18:27:17.068Z"
  }
}
```
<br>

#### `PATCH /apps/:appId`
Updates the app with a matching `appId`

Example Request:

```json
{
  "title": "App with Edited name"
}
```

Example Response:

```json
{
  "payload": {
    "id": 2,
    "title": "App with Edited name",
    "created_at": "2022-08-11T18:27:17.068Z",
    "updated_at": "2022-08-11T18:42:19.981Z"
  }
}
```
<br>

#### `DELETE /apps/:appId`
Deletes the app with a matching `appId`

Example Response:

```json
{
  "payload": {
    "id": 2,
    "title": "App with Edited name",
    "created_at": "2022-08-11T18:27:17.068Z",
    "updated_at": "2022-08-11T18:42:19.981Z"
  }
}
```
<br>

---
### Flags

#### `GET /apps/:appId/flags`
Returns all flags ruleset data belonging to a specific app

Example Response:

```json
{
  "payload": [
    {
      "id": 1,
      "app_id": 1,
      "title": "App 1 Flag 1",
      "description": "",
      "is_active": false,
      "rollout_percentage": 100,
      "white_listed_users": "",
      "error_threshold_percentage": 50,
      "circuit_status": "open",
      "is_recoverable": false,
      "circuit_recovery_percentage": 100,
      "circuit_recovery_delay": 100,
      "circuit_initial_recovery_percentage": 10,
      "circuit_recovery_rate": 100,
      "circuit_recovery_increment_percentage": 0.1,
      "circuit_recovery_profile": "linear",
      "webhooks": "",
      "created_at": "2022-08-11T18:51:52.882Z",
      "updated_at": "2022-08-11T18:51:52.882Z"
    },
    {
      "id": 2,
      "app_id": 1,
      "title": "App 1 Flag 2",
      "description": "",
      "is_active": false,
      "rollout_percentage": 100,
      "white_listed_users": "",
      "error_threshold_percentage": 50,
      "circuit_status": "open",
      "is_recoverable": false,
      "circuit_recovery_percentage": 100,
      "circuit_recovery_delay": 100,
      "circuit_initial_recovery_percentage": 10,
      "circuit_recovery_rate": 100,
      "circuit_recovery_increment_percentage": 0.1,
      "circuit_recovery_profile": "linear",
      "webhooks": "",
      "created_at": "2022-08-11T18:52:27.200Z",
      "updated_at": "2022-08-11T18:52:27.200Z"
    }
  ]
}
```
<br>

#### `GET /flags/:flagId`
Returns the flag with a matching `flagId` and its ruleset data

Example Response:

```json
{
  "payload": {
    "id": 1,
    "title": "App 1 Flag 1",
    "app_id": 1,
    "is_active": false,
    "description": "",
    "rollout_percentage": 100,
    "white_listed_users": "",
    "webhooks": "",
    "circuit_status": "open",
    "is_recoverable": false,
    "error_threshold_percentage": 50,
    "circuit_recovery_percentage": 100,
    "circuit_recovery_delay": 100,
    "circuit_initial_recovery_percentage": 10,
    "circuit_recovery_rate": 100,
    "circuit_recovery_increment_percentage": 0.1,
    "circuit_recovery_profile": "linear",
    "created_at": "2022-08-11T18:51:52.882Z",
    "updated_at": "2022-08-11T18:51:52.882Z",
    "logs": [
      {
        "log_id": 1,
        "flag_id": 1,
        "log_description": "Flag Created",
        "action_type": "create",
        "created_at": "2022-08-11T18:51:52.887Z",
        "updated_at": "2022-08-11T18:51:52.887Z"
      }
    ]
  }
}
```
<br>

#### `POST /apps/:appId/flags`
Creates a new flag

Successfully creating a flag with `POST` will also create a new log. All flags are initially created in an 'off' toggle state.

Example Request:

```json
{
  "title": "App 1 Flag 1",
  "rollout_percentage": 100,
  "circuit_recovery_percentage": 100,
  "error_threshold_percentage": 50

}
```

Example Response:

```json
{
  "payload": {
    "id": 1,
    "app_id": 1,
    "title": "App 1 Flag 1",
    "description": "",
    "is_active": false,
    "rollout_percentage": 100,
    "white_listed_users": "",
    "error_threshold_percentage": 50,
    "circuit_status": "open",
    "is_recoverable": false,
    "circuit_recovery_percentage": 100,
    "circuit_recovery_delay": 100,
    "circuit_initial_recovery_percentage": 10,
    "circuit_recovery_rate": 100,
    "circuit_recovery_increment_percentage": 0.1,
    "circuit_recovery_profile": "linear",
    "webhooks": "",
    "created_at": "2022-08-11T18:51:52.882Z",
    "updated_at": "2022-08-11T18:51:52.882Z"
  }
}
```
<br>

#### `PATCH /flags/:flagId`
Updates the flag with a matching `flagId`

Successfully updating a flag with `PATCH` will create a new log.

Example Request:

```json
{
  "title": "App 1 Flag 1",
  "rollout_percentage": 50,
  "circuit_status": "close",
  "is_active": false,
  "is_recoverable": true,
  "circuit_initial_recovery_percentage": 10,
  "circuit_recovery_increment_percentage": 10,
  "circuit_recovery_percentage": 10,
  "error_threshold_percentage": 40,
  "circuit_recovery_rate": 400,
  "circuit_recovery_profile": "linear",
  "circuit_recovery_delay": 8000,
  "webhooks": "https://hooks.slack.com/services/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"
}
```

Example Response:

```json
{
  "payload": {
    "id": 1,
    "app_id": 1,
    "title": "App 1 Flag 1",
    "description": "",
    "is_active": false,
    "rollout_percentage": 50,
    "white_listed_users": "",
    "error_threshold_percentage": 40,
    "circuit_status": "open",
    "is_recoverable": true,
    "circuit_recovery_percentage": 10,
    "circuit_recovery_delay": 8000,
    "circuit_initial_recovery_percentage": 10,
    "circuit_recovery_rate": 400,
    "circuit_recovery_increment_percentage": 10,
    "circuit_recovery_profile": "linear",
    "webhooks": "https://hooks.slack.com/services/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",
    "created_at": "2022-08-11T18:51:52.882Z",
    "updated_at": "2022-08-11T18:56:12.441Z"
  }
}
```
<br>

#### `PATCH /flags/:flagId/toggle`
Toggles the `is_active` state of a flag with a matching `flagId` on or off

Successfully toggling a flag with `PATCH` will create a new log.

Example Response:

```json
{
  "payload": {
    "id": 1,
    "app_id": 1,
    "title": "App 1 Flag 1",
    "description": "",
    "is_active": false,
    "rollout_percentage": 50,
    "white_listed_users": "",
    "error_threshold_percentage": 40,
    "circuit_status": "open",
    "is_recoverable": true,
    "circuit_recovery_percentage": 10,
    "circuit_recovery_delay": 8000,
    "circuit_initial_recovery_percentage": 10,
    "circuit_recovery_rate": 400,
    "circuit_recovery_increment_percentage": 10,
    "circuit_recovery_profile": "linear",
    "webhooks": "https://hooks.slack.com/services/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",
    "created_at": "2022-08-11T18:51:52.882Z",
    "updated_at": "2022-08-11T19:03:47.457Z"
  }
}
```
<br>

#### `DELETE /flags/:flagId`
Deletes the flag with a matching `flagId`

Successfully deleting a flag with `DELETE` will create a new log.

Example Response:

```json
{
  "payload": 1
}
```
<br>

#### `POST /flags/circuit/:flagId/open`
Trips the circuit of a flag with a matching `flagId` open

Successfully opening a circuit with `POST` will create a new log.

Example Response:

```json
{
  "payload": 1
}
```
<br>

#### `POST /flags/circuit/:flagId/close`
Trips the circuit of a flag with a matching `flagId` closed

Successfully closing a circuit with `POST` will create a new log.

Example Response:

```json
{
  "payload": 1
}
```
<br>

---
### Logs
#### `GET /logs`
Returns all logs

Example Response:

```json
{
  "payload": [
    {
      "log_id": 4,
      "flag_id": 1,
      "flag_title": "App 1 Flag 1",
      "log_description": "Circuit Tripped Open",
      "action_type": "circuit_open",
      "created_at": "2022-08-11T19:27:29.104Z",
      "updated_at": "2022-08-11T19:27:29.104Z"
    },
    {
      "log_id": 3,
      "flag_id": 1,
      "flag_title": "App 1 Flag 1",
      "log_description": "Circuit Closed",
      "action_type": "circuit_close",
      "created_at": "2022-08-11T19:25:36.826Z",
      "updated_at": "2022-08-11T19:25:36.826Z"
    },
    {
      "log_id": 2,
      "flag_id": 2,
      "flag_title": "App 1 Flag 2",
      "log_description": "Flag Created",
      "action_type": "create",
      "created_at": "2022-08-11T19:25:13.614Z",
      "updated_at": "2022-08-11T19:25:13.614Z"
    },
    {
      "log_id": 1,
      "flag_id": 1,
      "flag_title": "App 1 Flag 1",
      "log_description": "Flag Created",
      "action_type": "create",
      "created_at": "2022-08-11T19:25:05.345Z",
      "updated_at": "2022-08-11T19:25:05.345Z"
    }
  ]
}
```
<br>

#### `GET /logs/:appId`
Returns all logs belonging to an app with a matching `appId`

Example Response:

```json
{
  "payload": [
    {
      "id": 1,
      "flag_id": 1,
      "app_id": 1,
      "description": "Flag Created",
      "action_type": "create",
      "flag_title": "App 1 Flag 1",
      "flag_description": "",
      "created_at": "2022-08-11T19:25:05.345Z",
      "updated_at": "2022-08-11T19:25:05.345Z"
    },
    {
      "id": 3,
      "flag_id": 1,
      "app_id": 1,
      "description": "Circuit Closed",
      "action_type": "circuit_close",
      "flag_title": "App 1 Flag 1",
      "flag_description": "",
      "created_at": "2022-08-11T19:25:36.826Z",
      "updated_at": "2022-08-11T19:25:36.826Z"
    }
  ]
}
```
<br>

---
### Keys

#### `GET /keys`
Returns a SDK key

Example Response:

```json
{
  "payload": {
    "id": "70a90b16-201c-4466-8dc9-5f5c620d5732",
    "created_at": "2022-08-11T19:37:46.595Z",
    "updated_at": "2022-08-11T19:37:46.595Z"
  }
}
```
<br>

#### `POST /keys`
Creates a SDK key

Example Response:

```json
{
  "payload": {
    "id": "3e381b25-7686-4847-b861-5ec9b87378f1",
    "created_at": "2022-08-11T19:37:13.391Z",
    "updated_at": "2022-08-11T19:37:13.391Z"
  }
}
```
<br>

---
### Redis Timeseries

#### `GET /flags/:flagId/timeseries`
Returns success/failure counts for a specified flag grouped into time buckets within a selected window of time

```json
{
  "payload": {
    [
      { "timestamp": 1661264546556, "success": 137, "failure": 4 },
      { "timestamp": 1661264549556, "success": 134, "failure": 6 },
      { "timestamp": 1661264552556, "success": 138, "failure": 3 },
      { "timestamp": 1661264555556, "success": 136, "failure": 5 },
      { "timestamp": 1661264558556, "success": 131, "failure": 9 },
      { "timestamp": 1661264561556, "success": 135, "failure": 6 },
      { "timestamp": 1661264564556, "success": 130, "failure": 10 },
      { "timestamp": 1661264567556, "success": 130, "failure": 11 },
      { "timestamp": 1661264570556, "success": 137, "failure": 3 },
      { "timestamp": 1661264573556, "success": 132, "failure": 9 }
    ]
  }
}