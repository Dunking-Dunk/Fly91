import dotenv from 'dotenv';

// Assuming you have prismaClient.js

// Load environment variables
dotenv.config();

export async function createServiceRequestDataHandler(
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

export async function AddrequestToServiceType(serviceTable, data, prisma) {
    await createRecord(serviceTable, data, prisma);
    console.log(`Added to ${serviceTable} request`);
}

export function generateSRID(requestType) {
    const upperCaseRequestType = requestType.toUpperCase();
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${upperCaseRequestType}-${randomSixDigitNumber}`;
}

export const createRecord = async (modelName, data, prisma) => {
    return await prisma[modelName].create({ data });
};

//CAB REQUEST
// const reqBody = {
//     serviceType: 'Cab',
//     firstName: 'Aarav',
//     lastName: 'Sharma',
//     employeeID: 'FLY91-0002',
//     department: 'Flight Ops',
//     mobileNumber: '9876543210',
//     email: 'aarav.sharma@example.com',
//     reasonForTravel: 'Sales_Travel',
//     hodApprovalAttachment: null,
//     additionalDetails: {
//         requestType: 'Cab',
//         city: 'London',
//         state: 'Paris',
//         pickUpAddress: '3rd street',
//         dropAddress: '9th street',
//         dateOfTravel: '2024-10-10T10:00:00.000Z',
//         startTime: '2024-10-10T10:00:00.000Z',
//         endTime: '2024-10-10T10:00:00.000Z',
//         pickUpTime: '2024-10-10T10:00:00.000Z',
//         createdAt: '2024-10-10T10:00:00.000Z',
//     },
// };

//HOTEL BODY
// const reqBody = {
//     serviceType: "Hotel",
//     firstName: "Aarav",
//     lastName: "Sharma",
//     employeeID: "FLY91-0002",
//     department: "Flight Ops",
//     mobileNumber: "9876543210",
//     email: "aarav.sharma@example.com",
//     reasonForTravel: "Sales_Travel",
//     hodApprovalAttachment: null,
//     additionalDetails: {
//         city: "Chennai",
//         state: "TN",
//         checkInDate: "2024-10-05T14:00:00.000Z",
//         checkInTime: "2024-10-05T10:00:00.000Z",
//         checkOutDate: "2024-10-10T12:00:00.000Z",
//         checkOutTime: "2024-10-10T10:00:00.000Z",
//         createdAt: "2024-10-10T10:00:00.000Z"
//     }
// }

//FLIGHT BODY
// const reqBody = {
//     serviceType: "Flight",
//     firstName: "Aarav",
//     lastName: "Sharma",
//     employeeID: "FLY91-0001",
//     department: "Flight Ops",
//     mobileNumber: "9876543210",
//     email: "aarav.sharma@example.com",
//     reasonForTravel: "Sales_Travel",
//     hodApprovalAttachment: null,
//     additionalDetails: {
//         tripType: "Multi_City",
//         origin: [
//             "New York",
//             "London"
//         ],
//         destination: [
//             "London",
//             "India"
//         ],
//         departureDate: "2024-10-05T14:00:00.000Z",
//         arrivalDate: "2024-10-10T12:00:00.000Z",
//         departureTimePreference: null,
//         arrivalTimePreference: null,
//         createdAt: "2024-09-28T14:00:00.000Z",
//         class: "Business"
//     }
// }
