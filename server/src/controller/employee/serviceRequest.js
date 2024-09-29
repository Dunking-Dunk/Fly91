import prisma from '../../db/prismaClient.js'; 
import { createRecord } from '../postData/postData.js';

function generateSRID(requestType) {
    const upperCaseRequestType = requestType.toUpperCase();
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${upperCaseRequestType}-${randomSixDigitNumber}`;
}

async function AddrequestToServiceType(serviceTable, data, prisma) {
    await createRecord(serviceTable, data, prisma); 
    console.log(`Added to ${serviceTable} request`);
}

async function createServiceRequestDataHandler(serviceRequestData, serviceType, additionalDetails, prisma) {
    const { serviceRequestID, ...restData } = serviceRequestData;

    try {
        const isservicecreated = await createRecord('serviceRequest', {
            serviceRequestID,
            ...restData,
            status: 'Submitted',
            statusTimestamp: new Date(),
            createdAt: new Date(),
            lastModifiedAt: new Date()
        }, prisma);

        const ServiceRequestNumber = isservicecreated.serviceRequestID;
        console.log('Added ' + ServiceRequestNumber + ' to service request Table');

        const serviceTableMap = {
            'Flight': 'flightRequest',
            'Hotel': 'hotelRequest',
            'Cab': 'cabRequest',
        };
        const serviceTable = serviceTableMap[serviceType];
        if (!serviceTable) throw new Error('Invalid service type');

        
        await AddrequestToServiceType(serviceTable, {
            serviceRequestID: ServiceRequestNumber,
            ...additionalDetails,
        }, prisma); 

        return { serviceRequestID };
    } catch (error) {
        console.error('Error creating service request:', error);
        throw new Error('Failed to create service request');
    }
};

export async function createServiceRequest(req, res) {
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
        additionalDetails
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
        serviceType
    };

    try {
        await createServiceRequestDataHandler(serviceRequestData, serviceType, additionalDetails, prisma); // Pass prisma here
        res.status(201).json({
            status: "Success"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
