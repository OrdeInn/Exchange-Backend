const PortfolioService = require('../services/PortfolioService');

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
    registerPortfolio: registerPortfolio
}