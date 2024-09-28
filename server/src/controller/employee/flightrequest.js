import prisma from '../../db/prismaClient.js';
import express from 'express';

function generateSRID(requestType) {
    const upperCaseRequestType = requestType.toUpperCase();
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${upperCaseRequestType}-${randomSixDigitNumber}`;
}

export const addFlightRequest = async (req, res) => {
    try {
        const {
            requestType,
            employee: {
                firstname, lastname, employeeid, dept, mobilenumber, email, reason, hoddoc
            },
            flightRequest: {
                srnid, origin, destination, dep_date, time_preference_dep, time_preference_arrival, time_arrival, tripType,
            }
        } = req.body;
        console.log('Received req.body:', req.body);

        const employee = await prisma.employee.findUnique({
            where: { employeeId: employeeid },
        });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const serviceRequest = await prisma.serviceRequest.create({
            data: {
                serviceRequestID: generateSRID(requestType),
                serviceType: 'Flight',
                employeeID: employeeid,
                name: `${firstname} ${lastname}`,
                department: dept,
                mobileNumber: mobilenumber,
                reasonForTravel: reason,
                hodApprovalAttachment: hoddoc || null,
                status: 'Submitted',
                createdAt: new Date(),
            },
        });

        const flightRequests = await prisma.flightRequest.create({
            data: {
                serviceRequestID: serviceRequest.serviceRequestID,
                tripType: tripType,
                origin: origin,
                destination: destination,
                departureDate: new Date(dep_date),
                arrivalDate: tripType === "One_Way" ? null : new Date(time_arrival),
                departureTimePreference: time_preference_dep ? new Date(time_preference_dep) : null,
                arrivalTimePreference: time_preference_arrival ? new Date(time_preference_arrival) : null,
                createdAt: new Date(),
                class: 'Business', 
            },
        });

        // Log the created records
        console.log('Service request added:', serviceRequest);
        console.log('Flight request added :', flightRequests);

        // Respond with success message and created records
        res.status(201).json({
            message: 'Flight request created successfully',
            flightRequests,
            serviceRequest,
        });
    } catch (error) {
        console.error('Error in addFlightRequest:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};