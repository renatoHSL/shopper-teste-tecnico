import { Router } from 'express'
import rideEstimateRoute from './rideEstimateRoute.js'

const router = Router()

router.get('/', (req, res) => {
  res.send('Backend funcionando')
})

router.use('/ride', rideEstimateRoute)

export { router }
