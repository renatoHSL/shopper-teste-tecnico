import axios from 'axios'
import db from '../database/knex.js'
import { config as dotenvConfig } from 'dotenv'
import { Response } from 'express'

dotenvConfig({ path: '../.env' })

export class RideEstimateService {
  private GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

  public estimate = async (
    origin: string,
    destination: string,
    res: Response,
  ) => {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'

    // console.log('Chave da API do Google:', this.GOOGLE_API_KEY)

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

      console.log('Resposta da API do Google:', response.data)

      const googleData = response.data
      const originCoords = googleData.routes[0]?.legs[0]?.startLocation
      console.log('origincoords', originCoords)
      const destinationCoords = googleData.routes[0]?.legs[0]?.endLocation
      const distance = googleData.routes[0]?.legs[0]?.distanceMeters / 1000
      const duration = googleData.routes[0]?.legs[0]?.duration

      console.log('Resposta da API do Google depois das dtas:', response.data)

      if (distance < 1) {
        res.status(400).json({
          error_code: 'INVALID_DISTANCE',
          error_description:
            'A distância total da viagem deve ser maior ou igual a 1km.',
        })
      }

      const drivers = await db('drivers').select()

      // console.log('Dados dos motoristas:', drivers)

      const filteredDrivers = drivers.filter(
        (driver) => distance >= driver.min_km,
      )

      const options = filteredDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        rating: driver.rating,
        value: driver.rate_per_km * distance,
      }))

      options.sort((a, b) => a.value - b.value)

      console.log('ORIGEM LATIDADE:', originCoords.latLng.latitude)

      return {
        origin: {
          latitude: originCoords.latLng.latitude,
          longitude: originCoords.latLng.longitude,
        },
        destination: {
          latitude: destinationCoords.latLng.latitude,
          longitude: destinationCoords.latLng.longitude,
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
