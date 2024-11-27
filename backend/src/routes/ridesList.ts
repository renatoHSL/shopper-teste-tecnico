import express from 'express'
import { getRidesController } from '../controllers/RidesListController.js'

const router = express.Router()

router.get('/ride/:customer_id', (req, res, next) => {
  getRidesController(req, res).catch(next)
})

export default router
