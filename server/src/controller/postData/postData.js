import prisma from '../../db/prismaClient.js';

export const createRecord = async (modelName, data, prisma) => {
    try {
        return await prisma[modelName].create({ data });
    } catch (error) {
        console.error(`Error creating record in ${modelName}:`, error);
        throw new Error(`Failed to create record in ${modelName}`);
    }
};

export const handlePostRequest = async (req, res, modelName, relatedModelHandler = null, prisma) => {
    try {
        const data = req.body;
        const createdRecord = await createRecord(modelName, data, prisma);
        if (relatedModelHandler) {
            await relatedModelHandler(createdRecord, req.body, prisma);
        }
        res.status(201).json({
            message: `${modelName} created successfully`,
            data: createdRecord,
        });
    } catch (error) {
        console.error(`Error in ${modelName} post request:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
