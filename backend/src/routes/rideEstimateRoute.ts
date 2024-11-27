import { Router } from 'express'
import { RideEstimateController } from '../controllers/rideEstimateController.js'

const router = Router()

const rideEstimateController = new RideEstimateController()

router.post('/ride/estimate', (req, res, next) => {
  rideEstimateController.estimate(req, res).catch(next)
})

export default router
