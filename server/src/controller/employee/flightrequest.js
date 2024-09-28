import prisma from '../../db/prismaClient.js';
import express from 'express';

function generateSRID(requestType) {
    const upperCaseRequestType = requestType.toUpperCase();
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return `SRN-${upperCaseRequestType}-${randomSixDigitNumber}`;
}

export const addFlightRequest = async (req, res) => {
    try {
        // Destructure required and optional properties from req.body
        const {
            employee: {
                firstname, lastname, employeeid, dept, mobilenumber, email, reason, hoddoc
            },
            flightRequest: {
                srnid, origin, destination, dep_date, time_preference_dep, time_preference_arrival, time_arrival, type, requestType
            }
        } = req.body;
        console.log('Received req.body:', req.body);

        const employee = await prisma.employee.findUnique({
            where: { employeeId: employeeid },
        });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Create a new ServiceRequest
        const serviceRequest = await prisma.serviceRequest.create({
            data: {
                serviceRequestID: generateSRID('Flight'),
                serviceType: 'Flight', // Assuming this is an enum value
                employeeID: employeeid,
                name: `${firstname} ${lastname}`,
                department: dept,
                mobileNumber: mobilenumber,
                reasonForTravel: reason, // Should be an enum value
                hodApprovalAttachment: hoddoc || null,
                status: 'Submitted',
                createdAt: new Date(),
            },
        });

        // Create a new FlightRequest linked to the ServiceRequest
        // const flightRequest = await prisma.flightRequest.create({
        //     data: {
        //         serviceRequestID: serviceRequest.serviceRequestID,
        //         tripType: type, // Should be an enum value
        //         origin,
        //         destination,
        //         departureDate: new Date(dep_date),
        //         arrivalDate: type === "One_Way" ? null : new Date(time_arrival),
        //         departureTimePreference: time_preference_dep ? new Date(time_preference_dep) : null,
        //         arrivalTimePreference: time_preference_arrival ? new Date(time_preference_arrival) : null,
        //         createdAt: new Date(),
        //         class: 'Business'
        //     },
        // });

        const flightRequests = await Promise.all(origin.map((orig, index) => {
            return prisma.flightRequest.create({
                data: {
                    serviceRequestID: serviceRequest.serviceRequestID,
                    tripType, // This should be the same for all in the request
                    origin: [orig], // Store as an array
                    destination: [destination[index]], // Store as an array
                    departureDate: new Date(dep_date[index]),
                    arrivalDate: tripType === "One_Way" ? null : new Date(time_arrival[index]),
                    departureTimePreference: time_preference_dep ? new Date(time_preference_dep) : null,
                    arrivalTimePreference: time_preference_arrival ? new Date(time_preference_arrival) : null,
                    createdAt: new Date(),
                    class: 'Business', // Can adjust based on request if needed
                },
            });
        }));

        // Log the created records
        console.log('Service request added:', serviceRequest);
        console.log('Flight request added :', flightRequest);

        // Respond with success message and created records
        res.status(201).json({
            message: 'Flight request created successfully',
            flightRequest,
            serviceRequest,
        });
    } catch (error) {
        console.error('Error in addFlightRequest:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};