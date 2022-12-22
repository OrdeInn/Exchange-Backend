const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/PortfolioController');

router.get('/', PortfolioController.getPortfolios);
router.post('/', PortfolioController.registerPortfolio);

module.exports = router;
