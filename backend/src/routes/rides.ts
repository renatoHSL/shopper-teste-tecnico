import { Router } from 'express'
import { confirmRide } from '../controllers/RidesController'

const ridesRouter = Router()

ridesRouter.patch('/ride/confirm', confirmRide)

export default ridesRouter
