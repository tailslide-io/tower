const express = require('express');
const router = express.Router();
const appControllers = require('../controllers/appControllers');
const flagControllers = require('../controllers/flagControllers');
const logControllers = require('../controllers/logControllers');
const keyControllers = require('../controllers/keyControllers');
const publishControllers = require('../controllers/publishControllers');

// apps
router.post('/apps', appControllers.createApp);
router.get('/apps', appControllers.getApps);
router.get('/apps/:appId', appControllers.getApp);
router.delete('/apps/:appId', appControllers.deleteApp);
router.patch('/apps/:appId', appControllers.updateApp);

// flags
router.get('/apps/:appId/flags', flagControllers.getFlags);
router.get('/flags/:flagId', flagControllers.getFlag);
router.post(
  '/apps/:appId/flags',
  flagControllers.createFlag,
  logControllers.flagCreatedLog,
  publishControllers.getAppFlags,
  publishControllers.publishAppFlags,
  flagControllers.returnCreatedFlag
);
router.patch(
  '/flags/:flagId',
  flagControllers.updateFlag,
  logControllers.flagUpdatedLog,
  publishControllers.getAppFlags,
  publishControllers.publishAppFlags,
  flagControllers.returnPatchedFlag
);

router.patch(
  '/flags/:flagId/toggle',
  flagControllers.updateFlag,
  logControllers.flagToggleLog,
  publishControllers.getAppFlags,
  publishControllers.publishAppFlags,
  flagControllers.returnPatchedFlag
);

router.delete(
  '/flags/:flagId',
  flagControllers.deleteFlag,
  logControllers.flagDeletedLog,
  publishControllers.getAppFlags,
  publishControllers.publishAppFlags,
  flagControllers.returnDeletedFlag
);

router.post(
  '/flags/circuit/:flagId/open',
  flagControllers.openCircuit,
  logControllers.circuitOpenedLog,
  publishControllers.getAppFlags,
  publishControllers.publishAppFlags,
  flagControllers.returnOpenedCircuit
);

router.post(
  '/flags/circuit/:flagId/close',
  flagControllers.closeCircuit,
  logControllers.circuitClosedLog,
  publishControllers.getAppFlags,
  publishControllers.publishAppFlags,
  flagControllers.returnClosedCircuit
);

// logs
// Change this to return all logs, not just related to an app
router.get('/logs/:appId', logControllers.getLogsForApp);
router.get('/logs', logControllers.getAllLogs);

// keys
router.get('/keys', keyControllers.getKey);
router.post('/keys', keyControllers.createKey);

/*
  On Create, Delete, and Modification - want to publish the entire ruleset for an application to
  an application stream

  -> appFlagInfo = getFlagInfo(appId)
  -> publishFlag(appId, appFlagInfo)
    -> encode the appFlagInfo using a JSONCodec
    -> appId -> matches the Subject

  1. Flag Created database handler
  2. Log Created database handler
  3. Evoke publish flag function -> NATS
    - Fetch all flag data by app id
    - Structure data as needed
    - Publish payload

*/

module.exports = router;
