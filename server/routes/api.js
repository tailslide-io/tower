const express = require('express');
const router = express.Router();
const appControllers = require('../controllers/appControllers');
const flagControllers = require('../controllers/flagControllers');
const logControllers = require('../controllers/logControllers');

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
router.put('/flags/:flagId', flagControllers.updateFlag);
router.delete('/flags/:flagId', flagControllers.deleteFlag);

// router.post('/flags/circuit/:id/open');
// router.post('/flags/circuit/:id/close');

// logs
// router.get('/logs/:appid');

// keys
// router.get('/keys');
// router.post('/keys');

module.exports = router;
