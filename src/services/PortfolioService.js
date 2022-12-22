'use strict'

const { PrismaClient } = require('@prisma/client');

function Portfolio () {

    const prisma = new PrismaClient();

    this.register = async function(registerRequest) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.portfolio.create({
                data: {
                    email: registerRequest.email
                }
            });

        } catch (err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while registering portfolio: ${err.message}`;
        }

        return serviceResult;
    };

    this.getPortfolio = async function(id) {
        const serviceResult = {
            error: false
        };

        try {
            serviceResult.obj = await prisma.portfolio.findFirst({
                where: {id: id}
            });

        } catch(err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while fetching portfolio ${id}.ErrorMsg: ${err.message}`;
        }

        return serviceResult;
    };
}

module.exports = new Portfolio();
