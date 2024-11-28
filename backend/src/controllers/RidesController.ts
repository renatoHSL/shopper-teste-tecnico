import { Request, Response } from 'express'
import { RidesService } from '../services/RidesService.js'

export const confirmRide = async (req: Request, res: Response) => {
  try {
    const rideData = req.body

    // Call the service to handle the logic
    const result = await RidesService.confirmRide(rideData)

    // Respond with the result
    res.status(200).json({ success: true, ...result })
  } catch (error: any) {
    // Error handling
    if (error.code && error.message) {
      res.status(error.code).json({
        error_code: error.error_code,
        error_description: error.message,
      })
    } else {
      res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'An unexpected error occurred.',
      })
    }
  }
}
