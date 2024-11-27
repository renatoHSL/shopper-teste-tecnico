import { Request, Response } from 'express'
import { confirmRideService } from '../services/RidesService.js'

export async function confirmRideController(req: Request, res: Response) {
  try {
    const rideData = req.body

    if (!rideData.customer_id || !rideData.origin || !rideData.destination) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description:
          'Os dados fornecidos no corpo da requisição são inválidos',
      })
    }

    if (rideData.origin === rideData.destination) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description:
          'Os dados fornecidos no corpo da requisição são inválidos',
      })
    }

    await confirmRideService(rideData)

    return res.status(200).json({ success: true })
  } catch (error) {
    if (error.message.includes('DRIVER_NOT_FOUND')) {
      return res.status(404).json({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: 'Motorista não encontrado',
      })
    } else if (error.message.includes('INVALID_DISTANCE')) {
      return res.status(406).json({
        error_code: 'INVALID_DISTANCE',
        error_description: 'Quilometragem inválida para o motorista',
      })
    }
  }
}
