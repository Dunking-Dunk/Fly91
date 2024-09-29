import express from 'express'
import { NotFoundError } from '../error/not-found-error.js'
import { getEmployeeDashboardData, getEmployeeDetails, getEmployeeServiceDetails } from '../controller/employee/dashboard.js'

import { Router } from 'express';
import { createServiceRequest } from '../controller/employee/serviceRequest.js';


const router = Router();


// const router = express.Router()

// router.get('/employee/dashboard', async(req,res) => {
//     const id = 1
//     if (id === 1) {
//         throw new NotFoundError()
//     }
//     res.status(200).json('hello')
// })
        
router.get('/employee/dashboard', getEmployeeDashboardData)
router.get('/employee/service', getEmployeeServiceDetails)
router.get('/employee',getEmployeeDetails)
router.post('/employee/serviceRequest', createServiceRequest)


export default router



