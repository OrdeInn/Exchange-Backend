const ShareService = require('../services/ShareService');
const PortfolioService = require('../services/PortfolioService');

async function verifyShare(req, res, next) {
    const shareRes = await ShareService.getShare({symbol: req.body.shareCode});

    if (shareRes.error || !shareRes.obj) {
        res.status(400).send({ message: shareRes.errorMsg || `The share ${req.body.shareCode} does not exist!`});
        return;
    }

    next();
}

async function verifyPortfolio(req, res, next) {
    const portfolioRes = await PortfolioService.getPortfolio(req.body.portfolioId);

    if (portfolioRes.error || !portfolioRes.obj) {
        res.status(400).send({ message: portfolioRes.errorMsg || `The portfolio ${req.body.portfolioId} does not exist!`});
        return;
    }

    next();
}   


module.exports = {
    verifyShare: verifyShare,
    verifyPortfolio: verifyPortfolio
}