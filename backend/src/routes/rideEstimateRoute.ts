import { Router } from 'express'
import { RideEstimateController } from '../controllers/rideEstimateController.js'

const router = Router()
const rideEstimateController = new RideEstimateController()

router.post('/', (req, res, next) => {
  console.log('Rota POST /ride/estimate acessada')
  rideEstimateController.estimate(req, res).catch(next)
})

export default router
