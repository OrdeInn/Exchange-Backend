const PortfolioService = require('../services/PortfolioService');

async function getPortfolios(req, res, next) {
    const portfolioRes = await PortfolioService.getAllPortfolios();

    if (portfolioRes.error || !portfolioRes.obj) {
        res.status(400).send({message: portfolioRes.errorMsg || `There is no registered portfolio`});
        return;
    }

    res.status(200).send(portfolioRes.obj)
}

async function registerPortfolio(req, res, next) {
    const registerRequest = {
        email: req.body.email
    };

    const serviceResult = await PortfolioService.register(registerRequest); 

    if(serviceResult.error) {
        res.status(500).send({ message: serviceResult.errorMsg} );
        return;
    }

    res.status(200).send({ portfolio:serviceResult.obj });
}

module.exports = {
    registerPortfolio: registerPortfolio,
    getPortfolios: getPortfolios
}