import prisma from '../../db/prismaClient.js';

export const getEmployeeDashboardData = async (req, res) => {
    const employeeID = req.query.employeeID;
    console.log('Fetching data for Employee ID:', employeeID);
    try {
        const employeeServiceRequests = await prisma.ServiceRequest.findMany({
            where: {
                employeeID: employeeID,
            },
            select: {
                serviceRequestID: true,
                serviceType: true,
                createdAt: true,
                lastModifiedAt: true,
                status: true,
            },
        });
        res.json(employeeServiceRequests);
    } catch (error) {
        console.error('Error fetching service requests:', error);
        res.status(500).json({ error: 'Failed to fetch service requests' });
    }
};