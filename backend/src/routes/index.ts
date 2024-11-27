import { Router } from 'express'
import rideEstimateRoute from './rideEstimateRoute.js'
import ridesRoute from './rides.js'
import ridesListRoute from './ridesList.js'

const router = Router()

router.get('/', (req, res) => {
  res.send('Backend funcionando')
})

router.use('/ride/estimate', rideEstimateRoute)
router.use('/ride/confirm', ridesRoute)
router.use('/ride', ridesListRoute)

// Rota simples para teste
router.get('/api/test', (req, res) => {
  res.json({ message: 'CORS está funcionando!' })
})

router.use((req, res, next) => {
  console.log(`Rota acessada no roteador principal: ${req.method} ${req.url}`)
  next()
})

export { router }
