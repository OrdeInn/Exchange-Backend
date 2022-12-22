const ShareService = require('../services/ShareService');

async function getShares(req, res, next) {
    const shareRes = await ShareService.getAllShares();

    if (shareRes.error || !shareRes.obj) {
        res.status(400).send({message: shareRes.errorMsg || `Error when fetching shares`});
        return;
    }

    res.status(200).send(shareRes.obj)
}

module.exports = {
    getShares:getShares
}