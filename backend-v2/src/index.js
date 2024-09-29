import prisma from '../src/db/prismaClient.js';
import express from 'express';
import {
    generateSRID,
    createServiceRequestDataHandler,
} from './business_logic/service_requests.js';

const app = express();
app.use(express.json());
app.post('/service-request', async (req, res) => {
    try {
        const {
            employeeID,
            firstName,
            lastName,
            department,
            mobileNumber,
            email,
            reasonForTravel,
            hodApprovalAttachment,
            serviceType,
            additionalDetails,
        } = req.body;
        const fullname = `${firstName} ${lastName}`;
        const serviceRequestID = generateSRID(serviceType);
        const serviceRequestData = {
            serviceRequestID,
            employeeID,
            name: fullname,
            department,
            mobileNumber,
            reasonForTravel,
            hodApprovalAttachment,
            serviceType,
        };
        const result = await createServiceRequestDataHandler(
            serviceRequestData,
            serviceType,
            additionalDetails,
            prisma,
        );

        res.status(201).json({
            message: 'Service request created successfully',
            serviceRequestID: result.serviceRequestID,
        });
    } catch (error) {
        console.error('Error creating service request:', error);
        res.status(500).json({
            message: 'Failed to create service request',
            error: error.message,
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
