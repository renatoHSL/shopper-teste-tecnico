import express from 'express'
import { confirmRideController } from '../controllers/RidesController.js'

const router = express.Router()

router.patch('/ride/confirm', (req, res, next) => {
  confirmRideController(req, res).catch(next)
})

export default router
