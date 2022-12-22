'use strict'

const { PrismaClient } = require('@prisma/client');

function TradeService() {
    const prisma = new PrismaClient();

    this.createTradeTransaction() = async function(tradeRequest) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.trade.create({
                data: {
                    type: tradeRequest.TYPE,
                    shareCode: tradeRequest.shareCode,
                    portfolio: {connect: {id: tradeRequest.portfolioId}},
                    rate: tradeRequest.sharePrice,
                    quantity: tradeRequest.quantity
                }
            });
        } catch(err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while buying share with portfolio: ${tradeRequest.portfolioId}, Error: ${err.message}`;
        }

        return serviceResult;
    };

    this.getShareAvailability = async function(shareCode) {
        try {
            const buyTypeTrades = await prisma.trade.findMany({
                where: {
                    type: 'BUY',
                    shareCode: shareCode
                },
                select: {
                    quantity
                }
            });

            const sellTypeTrades = await prisma.trade.findMany({
                where: {
                    type: 'SELL',
                    shareCode: shareCode
                },
                select: {
                    quantity
                }
            });

            const totalBought = buyTypeTrades.reduce((acc, num)=> {
                return acc + num;
            }, 0);

            const totalSold = sellTypeTrades.reduce((acc, num)=> {
                return acc + num;
            }, 0);

            return (totalBought - totalSold) > 0;

        } catch(err) {
            console.log(err);
            return false;
        }
    };
}

module.exports = new TradeService();