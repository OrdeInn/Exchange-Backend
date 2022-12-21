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
                    email: registerRequest.userName
                }
            });

        } catch (err) {
            serviceResult.error = true;
            serviceResult.errorMsg = `Error while registering portfolio: ${err.message}`;
        }

        return serviceResult;
    };
}

module.exports = new Portfolio();