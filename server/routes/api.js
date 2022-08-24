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
router.delete('/apps/:appId', 
  appControllers.deleteApp,
  publishControllers.publishAppFlags,
  appControllers.returnDeletedApp
  );
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
router.get('/logs/:appId', logControllers.getLogsForApp);
router.get('/logs', logControllers.getAllLogs);

// keys
router.get('/keys', keyControllers.getKey);
router.post('/keys', keyControllers.createKey);

// timeseries
router.get('/flags/:flagId/timeseries', flagControllers.getFlagTimeSeriesData);

module.exports = router;
