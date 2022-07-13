const express = require('express');
const router = express.Router();
const appControllers = require('../controllers/appControllers');
const flagControllers = require('../controllers/flagControllers');
const logControllers = require('../controllers/logControllers');
const keyControllers = require('../controllers/keyControllers');

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
  logControllers.flagCreatedLog
);
router.patch(
  '/flags/:flagId',
  flagControllers.updateFlag,
  logControllers.flagUpdatedLog
);
router.delete(
  '/flags/:flagId',
  flagControllers.deleteFlag,
  logControllers.flagDeletedLog
); // to be tested once all logs is complete

router.post(
  '/flags/circuit/:flagId/open',
  flagControllers.openCircuit,
  logControllers.circuitOpenedLog
);

router.post(
  '/flags/circuit/:flagId/close',
  flagControllers.closeCircuit,
  logControllers.circuitClosedLog
);

// logs
router.get('/logs/:appId', logControllers.getLogsForApp);

// keys
router.get('/keys', keyControllers.getKey);
router.post('/keys', keyControllers.createKey);

module.exports = router;
