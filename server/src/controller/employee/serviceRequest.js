import prisma from '../../db/prismaClient.js';


function generateSRID(requestType) {
    const upperCaseRequestType = requestType.toUpperCase();
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${upperCaseRequestType}-${randomSixDigitNumber}`;
}

export const createServiceRequest = async (req, res) => {
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

    try {
        const serviceRequestID = generateSRID(serviceType);
        const fullname = firstName+" "+lastName;
        const newServiceRequest = await prisma.serviceRequest.create({
            data: {
                serviceRequestID,  
                serviceType,
                employeeID: employeeID,  
                name: fullname,
                department,
                mobileNumber,
                reasonForTravel,  
                hodApprovalAttachment,
                status: 'Submitted',
                statusTimestamp: new Date(),  
                createdAt: new Date(),
                lastModifiedAt: new Date()
            }
        });

        console.log('newservice req:'+newServiceRequest)
        let additionalData;

        if (serviceType === 'Flight') {
            additionalData = await prisma.flightRequest.create({
                data: {
                    serviceRequestID: newServiceRequest.serviceRequestID,
                    ...additionalDetails 
                }
            });
        } else if (serviceType === 'Hotel') {
            additionalData = await prisma.hotelRequest.create({
                data: {
                    serviceRequestID: newServiceRequest.serviceRequestID,
                    ...additionalDetails   
                }
            });
        } else if (serviceType === 'Cab') {
            additionalData = await prisma.cabRequest.create({
                data: {
                    serviceRequestID: newServiceRequest.serviceRequestID,
                    ...additionalDetails 
                }
            });
        } else {
            
            return res.status(400).json({ error: 'Invalid service type' });
        }

        res.status(201).json({
            serviceRequest: newServiceRequest,
            additionalDetails: additionalData
        });

    } catch (error) {
        console.error('Error creating service request:', error);
        res.status(500).json({ error: 'Failed to create service request' });
    }
};
