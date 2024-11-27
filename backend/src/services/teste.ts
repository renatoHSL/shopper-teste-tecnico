import { RideEstimateService } from './rideEstimateService.js'
;(async () => {
  const rideEstimateService = new RideEstimateService()

  const origin = '1600 Amphitheatre Parkway, Mountain View, CA'
  const destination = '1 Infinite Loop, Cupertino, CA'

  try {
    const response = await rideEstimateService.estimate(origin, destination)
    console.log('Resposta da API:', response)
  } catch (error) {
    console.error(
      'Erro ao calcular rota:',
      error.response?.data || error.message,
    )
  }
})()
