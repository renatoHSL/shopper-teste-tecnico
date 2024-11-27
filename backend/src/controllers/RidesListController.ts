import { Request, Response } from 'express'
import { getRidesService } from '../services/RIdesListService.js'

export async function getRidesController(req: Request, res: Response) {
  try {
    const { customer_id } = req.params
    const { driver_id } = req.query

    if (!customer_id) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'O ID do cliente é obrigatório.',
      })
    }

    const rides = await getRidesService(
      customer_id,
      driver_id ? Number(driver_id) : undefined,
    )

    if (rides.length === 0) {
      return res.status(404).json({
        error_code: 'NO_RIDES_FOUND',
        error_description: 'Nenhuma corrida encontrada para o cliente.',
      })
    }

    return res.status(200).json({
      customer_id,
      rides,
    })
  } catch (error) {
    if (error.message.includes('CUSTOMER_ID_REQUIRED')) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: error.message,
      })
    }

    if (error.message.includes('INVALID_DRIVER')) {
      return res.status(400).json({
        error_code: 'INVALID_DRIVER',
        error_description: error.message,
      })
    }

    return res.status(500).json({
      error_code: 'SERVER_ERROR',
      error_description: 'Erro interno do servidor.',
    })
  }
}
