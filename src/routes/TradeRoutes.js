const express = require('express');
const router = express.Router();
const TradeController = require('../controllers/TradeController');
const {verifyShare, verifyPortfolio} = require('../middlewares/TradeMiddlewares');

router.get('/:portfolioId', verifyShare, verifyPortfolio, TradeController.getTrades);
router.post('/sell', verifyShare, verifyPortfolio, TradeController.sellShare);
router.post('/buy', verifyShare, verifyPortfolio, TradeController.buyShare);

module.exports = router;
