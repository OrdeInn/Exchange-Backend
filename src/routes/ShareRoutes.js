const express = require('express');
const router = express.Router();
const ShareController = require('../controllers/ShareController');

router.get('/', ShareController.getShares);

module.exports = router;
