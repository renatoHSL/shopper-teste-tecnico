import { Request, Response } from 'express'
import { RideEstimateService } from '../services/rideEstimateService.js'

export class RideEstimateController {
  constructor() {}
  private rideEstimateService = new RideEstimateService()

  public estimate = async (req: Request, res: Response) => {
    try {
      const { customer_id, origin, destination } = req.body

      if (!customer_id || !origin || !destination) {
        return res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description:
            'Os dados fornecidos no corpo da requisição são inválidos',
        })
      }

      if (origin === destination) {
        return res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description:
            'Os dados fornecidos no corpo da requisição são inválidos',
        })
      }
      const data = await this.rideEstimateService.estimate(origin, destination)

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
