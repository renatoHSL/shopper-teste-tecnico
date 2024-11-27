import { confirmRide } from '../models/RidesConfirmModel.js' // Substitua pelo caminho correto da model

export async function confirmRideService(rideId: number): Promise<void> {
  if (!rideId || typeof rideId !== 'number') {
    throw new Error('O ID da corrida é obrigatório e deve ser um número.')
  }

  await confirmRide(rideId)
}
