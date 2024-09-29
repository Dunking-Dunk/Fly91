import prisma from '../../db/prismaClient.js';

import { getTableData } from '../fetchData/fetchData.js';

//http://localhost:8000/employee/dashboard?employeeID=FLY91-0001
export const getEmployeeServiceRequests = async (req, res) => {
    const employeeID = req.query.employeeID;
    console.log('Fetching data for Employee ID:', employeeID);
    try {
        const employeeServiceRequests = await getTableData('serviceRequest', {
            employeeID: employeeID  
        });
        res.json(employeeServiceRequests);
    }
    catch (error) {
        console.error('Error fetching service requests:', error);
        res.status(500).json({ error: 'Failed to fetch service requests' });
    }
};


export const getEmployeeDetails = async (req, res) => {
    const employeeID = req.query.employeeID;
    console.log('Fetching data for Employee ID:', employeeID);
    try {
        const employeeServiceRequests = await getTableData('employee', {
            employeeId: employeeID  
        });
        res.json(employeeServiceRequests);
    }
    catch (error) {
        console.error('Error fetching service requests:', error);
        res.status(500).json({ error: 'Failed to fetch service requests' });
    }
};


//http://localhost:8000/employee/service?serviceRequestID=SRN-CAB-000146
export const getServiceRequestDetails = async (req, res) => {

    const serviceRequestID = req.query.serviceRequestID;  
    try {
        
        const serviceRequest = await getTableData('serviceRequest', {
            serviceRequestID: serviceRequestID  
        });

        if (!serviceRequest) {
            return res.status(404).json({ error: 'Service request not found' });
        }

        const employeeID = serviceRequest[0].employeeID
        const employeeDetails = await getTableData('employee', {
            employeeId: employeeID  
        });


        let additionalDetails = {};

        if (serviceRequest[0].serviceType === 'Flight') {
            additionalDetails = await getTableData('flightRequest', {
                serviceRequestID: serviceRequestID,
            });
        }
        else if (serviceRequest[0].serviceType === 'Hotel') {
            additionalDetails = await getTableData('hotelRequest', {
                serviceRequestID: serviceRequestID,
            });
        }
        else if (serviceRequest[0].serviceType === 'Cab') {
            additionalDetails = await getTableData('cabRequest', {
                serviceRequestID: serviceRequestID,
            });
        }
        res.json({
            serviceRequest,
            employeeDetails,
            additionalDetails
        });
    } catch (error) {
        console.error('Error fetching employee or service details:', error);
        res.status(500).json({ error: 'Failed to fetch service details' });
    }
};
