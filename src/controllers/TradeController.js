const TradeService = require('../services/TradeService');
const ShareService = require('../services/ShareService');

async function getTrades(req, res, next) {
    const tradeRes = await TradeService.getTradesForPortfolio(req.params.portfolioId);

    if (tradeRes.error || !tradeRes.obj) {
        res.status(400).send({message: tradeRes.errorMsg || `Error fetching trades portfolioId ${req.params.portfolioId}`});
        return;
    }

    res.status(200).send(tradeRes.obj)
}

async function buyShare(req, res, next) {
    const latestShareresult = await ShareService.getShare({symbol: req.body.shareCode});

    if (latestShareresult.error) {
        res.status(500).send({ message:latestShareresult.errorMsg });
        return;
    }

    const tradeRequest = {
        TYPE: 'BUY',
        shareCode: req.body.shareCode,
        portfolioId: req.body.portfolioId,
        rate: latestShareresult.obj.rate,
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
    const tradeRequest = {
        TYPE: 'SELL',
        shareCode: req.body.shareCode,
        portfolioId: req.body.portfolioId,
        quantity: req.body.quantity
    };
    
    const availableToSell = await TradeService.getAvailabilityToSell(tradeRequest);

    if (!availableToSell) {
        res.status(400).send({ message:`The share is not available to sell for portfolio` });
        return;
    }
    const latestShareRes = await ShareService.getShare({symbol: req.body.shareCode});
    
    if (latestShareRes.error) {
        res.status(500).send({ message:latestShareRes.errorMsg });
        return;
    }
    tradeRequest.rate = latestShareRes.obj.rate;
    
    const serviceResult = await TradeService.createTradeTransaction(tradeRequest);

    if (serviceResult.error) {
        res.status(500).send({ message:serviceResult.errorMsg });
        return;
    }

    res.status(200).send(serviceResult.obj);
}

module.exports = {
    buyShare: buyShare,
    sellShare: sellShare,
    getTrades: getTrades
}