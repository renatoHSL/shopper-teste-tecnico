import { Router } from 'express'
import rideEstimateController from '../controllers/rideEstimateController.js'

const router = Router()

const rideEstimateController = new RideEstimateController()

router.post('/ride/estimate', rideEstimateController.rideEstimate)

export default router
