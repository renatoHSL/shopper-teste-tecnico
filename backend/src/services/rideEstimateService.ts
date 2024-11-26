import axios from 'axios'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

export class RideEstimateService {
  constructor() {}
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

    const response = await axios.post(url, body, { headers })
    console.log('Google API Key:', process.env.GOOGLE_API_KEY)
    return response.data
  }
}
