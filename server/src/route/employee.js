import express from 'express'
import { NotFoundError } from '../error/not-found-error.js'

import { getEmployeeDashboardData, getEmployeeServiceDetails } from '../controller/employee/dashboard.js'
import { Router } from 'express';


const router = Router();


// const router = express.Router()

// router.get('/employee/dashboard', async(req,res) => {
//     const id = 1
//     if (id === 1) {
//         throw new NotFoundError()
//     }
//     res.status(200).json('hello')
// })

router.get('/employee/dashboard',getEmployeeDashboardData)



router.get('/employee/service',getEmployeeServiceDetails)



export default router