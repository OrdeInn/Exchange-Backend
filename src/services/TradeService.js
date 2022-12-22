'use strict'

const { PrismaClient } = require('@prisma/client');

function TradeService() {
    const prisma = new PrismaClient();

    this.createTradeTransaction = async function(tradeRequest) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.trade.create({
                data: {
                    type: tradeRequest.TYPE,
                    shareCode: tradeRequest.shareCode,
                    portfolio: {connect: {id: tradeRequest.portfolioId}},
                    rate: tradeRequest.rate,
                    quantity: tradeRequest.quantity
                }
            });
        } catch(err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while buying share with portfolio: ${tradeRequest.portfolioId}, Error: ${err.message}`;
        }

        return serviceResult;
    };

    this.getShareAvailability = async function(request) {
        try {
            const buyTypeTrades = await prisma.trade.findMany({
                where: {
                    type: 'BUY',
                    portfolioId: request.portfolioId,
                    shareCode: request.shareCode
                },
                select: {
                    quantity: true
                }
            });

            const sellTypeTrades = await prisma.trade.findMany({
                where: {
                    type: 'SELL',
                    portfolioId: request.portfolioId,
                    shareCode: request.shareCode
                },
                select: {
                    quantity: true
                }
            });

            const totalBought = buyTypeTrades.reduce((acc, trade)=> {
                return acc + trade.quantity;
            }, 0);

            const totalSold = sellTypeTrades.reduce((acc, trade)=> {
                return acc + trade.quantity;
            }, 0);

            return (totalBought - totalSold) > 0;

        } catch(err) {
            console.log(err);
            return false;
        }
    };
}

module.exports = new TradeService();