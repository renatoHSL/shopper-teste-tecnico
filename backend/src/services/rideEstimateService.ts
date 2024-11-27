import axios from 'axios'
import db from '../database/knex.js'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

export class RideEstimateService {
  private GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

  public estimate = async (origin: string, destination: string) => {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'

    const body = {
      origin: { address: origin },
      destination: { address: destination },
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': this.GOOGLE_API_KEY,
      'X-Goog-FieldMask': '*',
    }

    try {
      console.log('Chamando a API do Google...')
      const response = await axios.post(url, body, { headers })

      const googleData = response.data
      const originCoords = googleData.routes[0]?.legs[0]?.startLocation
      const destinationCoords = googleData.routes[0]?.legs[0]?.endLocation
      const distance = googleData.routes[0]?.legs[0]?.distanceMeters / 1000
      const duration = googleData.routes[0]?.legs[0]?.duration

      if (distance < 1) {
        throw new Error(
          'A distância total da viagem deve ser maior ou igual a 1km.',
        )
      }

      const drivers = await db('drivers').select()

      const filteredDrivers = drivers.filter(
        (driver) => distance >= driver.min_km,
      )

      const options = filteredDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: parseFloat(driver.rating.split('/')[0]),
          comment: driver.rating.split('-')[1]?.trim(),
        },
        value: driver.rate_per_km * distance,
      }))

      options.sort((a, b) => a.value - b.value)

      return {
        origin: {
          latitude: originCoords.latitude,
          longitude: originCoords.longitude,
        },
        destination: {
          latitude: destinationCoords.latitude,
          longitude: destinationCoords.longitude,
        },
        distance,
        duration,
        options,
        routeResponse: googleData,
      }
    } catch (error) {
      console.error('Erro ao chamar a API do Google:', error.message)
      throw new Error(
        'Falha ao calcular a rota. Verifique os dados fornecidos.',
      )
    }
  }
}
