import { Request, Response } from 'express'
import { RideEstimateService } from '../services/rideEstimateService.js'

export class RideEstimateController {
  private rideEstimateService = new RideEstimateService()

  public estimate = async (req: Request, res: Response): Promise<Response> => {
    console.log('Método estimate chamado')

    try {
      const { customer_id, origin, destination } = req.body

      // console.log('Body recebido:', req.body)

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
            'Os endereços de origem e destino não podem ser iguais.',
        })
      }

      const data = await this.rideEstimateService.estimate(
        origin,
        destination,
        res,
      )

      const response = {
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        duration: data.duration,
        options: data.options,
        routeResponse: data.routeResponse,
      }

      // console.log('response aqui', response)
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({
        error_code: 'SERVER_ERROR',
        error_description: error.message,
      })
    }
  }
}
