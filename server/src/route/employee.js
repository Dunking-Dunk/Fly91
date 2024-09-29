import { getEmployeeDashboardData, getEmployeeServiceDetails } from '../controller/employee/dashboard.js'
import { Router } from 'express';
import { createServiceRequest } from '../controller/employee/serviceRequest.js';

const router = Router();

router.get('/employee/dashboard', getEmployeeDashboardData)
router.get('/employee/service', getEmployeeServiceDetails)
router.post('/employee/serviceRequest', createServiceRequest)


export default router