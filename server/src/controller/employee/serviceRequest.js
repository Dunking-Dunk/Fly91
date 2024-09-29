import { createRecord } from '../postData/postData.js';

function generateSRID(requestType) {
    const upperCaseRequestType = requestType.toUpperCase();
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${upperCaseRequestType}-${randomSixDigitNumber}`;
}

async function AddrequestToServiceTable(serviceTable, data) {
    const addSpecifiedRequest = await createRecord(serviceTable, data);
    console.log(`Added to ${serviceTable} request`);
}

async function createServiceRequestDataHandler(serviceRequestData, serviceType, additionalDetails) {
    const { serviceRequestID, ...restData } = serviceRequestData;

    try {
        const isservicecreated = await createRecord('serviceRequest', {
            serviceRequestID,
            ...restData,
            status: 'Submitted',
            statusTimestamp: new Date(),
            createdAt: new Date(),
            lastModifiedAt: new Date()
        });
        const ServiceRequestNumber = isservicecreated.serviceRequestID;
        console.log('Added ' + ServiceRequestNumber + ' to service request Table')

        let additionalData;
        const serviceTableMap = {
            'Flight': 'flightRequest',
            'Hotel': 'hotelRequest',
            'Cab': 'cabRequest',
        };
        const serviceTable = serviceTableMap[serviceType];
        if (!serviceTable) throw new Error('Invalid service type');

        AddrequestToServiceTable(serviceTable, {
            serviceRequestID: ServiceRequestNumber,
            ...additionalDetails,
        });

        return { serviceRequestID, additionalData };
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
        const { newServiceRequest, additionalData } = await createServiceRequestDataHandler(serviceRequestData, serviceType, additionalDetails);
        res.status(201).json({
            status: "Success"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};