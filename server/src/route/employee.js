import express from 'express'
import { NotFoundError } from '../error/not-found-error.js'
import { getEmployeeDashboardData } from '../controller/employee/dashboard.js'
import { addFlightRequest } from '../controller/employee/flightrequest.js';
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

router.get('/employee/dashboard', getEmployeeDashboardData)
router.post('/employee/addflightrequest', addFlightRequest)


export default router