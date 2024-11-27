import knex from 'knex'
import config from '../../knexfile.js'
import Rides from '../interfaces/RidesInterface.js'

const db = knex(config.development)

export async function saveRide(ride: Rides) {
  try {
    await db('rides').insert({
      id: ride.id,
      customer_id: ride.customer_id,
      driver_id: ride.driver_id,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      value: ride.value,
      date_time: ride.date_time || new Date(),
    })
  } catch (error) {
    throw new Error(`Erro ao salvar a corrida: ${error.message}`)
  }
}

export async function confirmRide(rideId: number): Promise<void> {
  try {
    // Atualizar o status da corrida para 'confirmed'
    const rowsAffected = await db('rides')
      .where({ id: rideId })
      .update({ status: 'confirmed' })

    if (rowsAffected === 0) {
      throw new Error(`Nenhuma corrida encontrada com o ID: ${rideId}`)
    }
  } catch (error) {
    throw new Error(`Erro ao confirmar a corrida: ${error.message}`)
  }
}

export async function closeConnection() {
  await db.destroy()
}
