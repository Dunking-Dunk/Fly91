import express from 'express'
import { NotFoundError } from '../error/not-found-error.js'
// import { getEmployeeDetails, getEmployeeServiceDetails } from '../controller/employee/employee.js'

import { Router } from 'express';
import { getEmployeeDetails, getEmployeeServiceRequests, getServiceRequestDetails } from '../controller/employee/employee.js';
import { createServiceRequest } from '../controller/employee/serviceRequest.js';
// import { createServiceRequest } from '../controller/employee/serviceRequest.js';


const router = Router();


// const router = express.Router()

// router.get('/employee/dashboard', async(req,res) => {
//     const id = 1
//     if (id === 1) {
//         throw new NotFoundError()
//     }
//     res.status(200).json('hello')
// })
   
// router.get('/employee/details',getEmployeeDetails)
// router.get('/employee/serviceRequests', getEmployeeServiceDetails) //input employeeID
// router.get('/employee/serviceRequestById', getEmployeeServiceDetails)//input serviceRequestID
// router.post('/employee/serviceRequest', createServiceRequest)


router.get("/employee/details",getEmployeeDetails);
router.get("/employee/service_requests",getEmployeeServiceRequests);
router.get("/employee/service_request",getServiceRequestDetails);
router.post("/employee/create_Service_request",createServiceRequest);


export default router



