const express = require('express');
const router = express.Router();
const TradeController = require('../controllers/TradeController');

router.post('/sell', TradeController.sellShare);
router.post('/buy', TradeController.buyShare);

module.exports = router;
