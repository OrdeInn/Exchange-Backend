'use strict'

const { PrismaClient } = require('@prisma/client');

function ShareService() {
    const prisma = new PrismaClient();

    this.handleSharePrices = function() {
        console.log('Called handleSharePrices');
        setInterval(async () => {
            console.log('Triggered')
            const sharesResult = await this.getAllShares();
            
            if (!sharesResult.error) {
                sharesResult.obj.forEach(async (share) => {
                    //Random price for every share
                    let latestPrice = (Math.random() * (1000 - 1) + 1).toFixed(2);
                    
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

    this.getShare = async function(request) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.share.findFirst({
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
            console.log('Price updated.')
        } catch(err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while updating share price with id: ${updateRequest.id}.ErrorMsg: ${err.message}`;
        }
        
        return serviceResult;
    };
}

module.exports = new ShareService();
