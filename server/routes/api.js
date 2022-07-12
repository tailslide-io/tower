const express = require('express');
const router = express.Router();
const appControllers = require('../controllers/appControllers');

// apps
router.post('/apps', appControllers.createApp);
router.get('/apps', appControllers.getApps);
router.get('/apps/:appId', appControllers.getApp);
router.delete('/apps/:appId', appControllers.deleteApp);
router.patch('/apps/:appId', appControllers.updateApp);

// flags
// router.get('/apps/:appid/flags');
// router.get('/flags/:id');
// router.post('/apps/:appid/flags');
// router.put('/flags/:id');
// router.delete('/flags/:id');

// router.post('/flags/circuit/:id/open');
// router.post('/flags/circuit/:id/close');

// logs
// router.get('/logs/:appid');

// keys
// router.get('/keys');
// router.post('/keys');

module.exports = router;
