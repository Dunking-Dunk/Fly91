async function createServiceRequestDataHandler(
    serviceRequestData,
    serviceType,
    additionalDetails,
    prisma,
) {
    const { serviceRequestID, ...restData } = serviceRequestData;

    const isservicecreated = await createRecord(
        'serviceRequest',
        {
            serviceRequestID,
            ...restData,
            // ...additionalDetails,
            status: 'Submitted',
            statusTimestamp: new Date(),
            createdAt: new Date(),
            lastModifiedAt: new Date(),
        },
        prisma,
    );

    const ServiceRequestNumber = isservicecreated.serviceRequestID;
    console.log('Added ' + ServiceRequestNumber + ' to service request Table');

    const serviceTableMap = {
        Flight: 'flightRequest',
        Hotel: 'hotelRequest',
        Cab: 'cabRequest',
    };
    const serviceTable = serviceTableMap[serviceType];
    if (!serviceTable) throw new Error('Invalid service type');

    await AddrequestToServiceType(
        serviceTable,
        {
            serviceRequestID: ServiceRequestNumber,
            ...additionalDetails,
        },
        prisma,
    );

    return { serviceRequestID };
}

async function AddrequestToServiceType(serviceTable, data, prisma) {
    await createRecord(serviceTable, data, prisma);
    console.log(`Added to ${serviceTable} request`);
}

function generateSRID(requestType) {
    const upperCaseRequestType = requestType.toUpperCase();
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${upperCaseRequestType}-${randomSixDigitNumber}`;
}

export const createRecord = async (modelName, data, prisma) => {
    // try {
    return await prisma[modelName].create({ data });
    // } catch (error) {
    //     console.error(`Error creating record in ${modelName}:`, error);
    //     throw new Error(`Failed to create record in ${modelName}`);
    // }
};

const reqBody = {
    serviceType: 'Cab',
    firstName: 'Aarav',
    lastName: 'Sharma',
    employeeID: 'FLY91-0002',
    department: 'Flight Ops',
    mobileNumber: '9876543210',
    email: 'aarav.sharma@example.com',
    reasonForTravel: 'Sales_Travel',
    hodApprovalAttachment: null,
    additionalDetails: {
        requestType: 'Cab',
        city: 'London',
        state: 'Paris',
        pickUpAddress: '3rd street',
        dropAddress: '9th street',
        dateOfTravel: '2024-10-10T10:00:00.000Z',
        startTime: '2024-10-10T10:00:00.000Z',
        endTime: '2024-10-10T10:00:00.000Z',
        pickUpTime: '2024-10-10T10:00:00.000Z',
        createdAt: '2024-10-10T10:00:00.000Z',
    },
};

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
} = reqBody;

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

import 'dotenv';
import prisma from '../db/prismaClient.js';

createServiceRequestDataHandler(
    serviceRequestData,
    serviceType,
    additionalDetails,
    prisma,
);
