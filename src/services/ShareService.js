'use strict'

const { PrismaClient } = require('@prisma/client');

function ShareService() {
    const prisma = new PrismaClient();

    this.handleSharePrices = function() {
        setInterval(async () => {
            const sharesResult = await this.getAllShares();
            
            if (!sharesResult.error) {
                sharesResult.obj.forEach(async (share) => {
                    //TODO
                    let latestPrice = 14.75;
                    
                    //async write
                    this.updatePrice({id: share.id, latestPrice: latestPrice});
                });
            }
        }, 3600000); // run every hour
    };

    this.getAllShares = async function() {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.share.findMany();

        } catch(err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while fetching shares: ${err.message}`;
        }
        
        return serviceResult;
    };

    this.getLatestShare = async function(request) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.share.findOne({
                where: {symbol: request.symbol},
                orderBy: {updatedAt: 'desc'}
            });

        } catch(err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while fetching latest share ${request.symbol}.ErrorMsg: ${err.message}`;
        }

        return serviceResult;
    };

    this.updatePrice = async function(updateRequest) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.share.update({
                where: { id: updateRequest.id },
                data: { rate: updateRequest.latestPrice}
            });

        } catch(err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while updating share price with id: ${updateRequest.id}.ErrorMsg: ${err.message}`;
        }
        
        return serviceResult;
    };
}

module.exports = new ShareService();
