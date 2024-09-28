import prisma from '../../db/prismaClient.js';

const modelMapping = {
    serviceRequest: prisma.serviceRequest,
    employee: prisma.employee,
    flightRequest: prisma.flightRequest,
    hotelRequest: prisma.hotelRequest,
    cabRequest: prisma.cabRequest,
};

export const getTableData = async (modelName, filter = {}) => {
    const model = modelMapping[modelName];
    
    if (!model) {
        throw new Error(`Invalid model: ${modelName}`);
    }

    return await model.findMany({
        where: filter
    });
};