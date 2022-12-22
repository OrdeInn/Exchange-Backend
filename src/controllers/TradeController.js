const TradeService = require('../services/TradeService');
const ShareService = require('../services/ShareService');

async function buyShare(req, res, next) {
    const latestShare = await ShareService.getLatestShare(req.shareCode);
    
    const tradeRequest = {
        TYPE: 'BUY',
        shareCode: req.body.shareCode,
        portfolioId: req.body.portfolioId,
        rate: latestShare.rate,
        quantity: req.body.quantity
    };

    const serviceResult = await TradeService.createTradeTransaction(tradeRequest);

    if (serviceResult.error) {
        res.status(500).send({ message:serviceResult.errorMsg });
        return;
    }

    res.status(200).send(serviceResult.obj);
}

async function sellShare(req, res, next) {
    const availableToSell = TradeService.getShareAvailability(req.body.shareCode);

    if (!availableToSell) {
        res.status(400).send({ message:`The share is not available to sell` });
        return;
    }
    const latestShare = await ShareService.getLatestShare(req.shareCode);
    const tradeRequest = {
        TYPE: 'SELL',
        shareCode: req.body.shareCode,
        portfolioId: req.body.portfolioId,
        rate: latestShare.rate,
        quantity: req.body.quantity
    };

    const serviceResult = await TradeService.createTradeTransaction(tradeRequest);

    if (serviceResult.error) {
        res.status(500).send({ message:serviceResult.errorMsg });
        return;
    }

    res.status(200).send(serviceResult.obj);
}

module.exports = {
    buyShare: buyShare,
    sellShare: sellShare
}