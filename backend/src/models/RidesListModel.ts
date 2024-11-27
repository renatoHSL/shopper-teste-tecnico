import knex from 'knex'
import config from '../../knexfile.js'

const db = knex(config.development)

export async function getRidesByCustomer(
  customerId: string,
  driverId?: number,
) {
  try {
    const query = db('rides')
      .where('customer_id', customerId)
      .orderBy('created_at', 'desc')

    if (driverId) {
      query.andWhere('driver_id', driverId)
    }

    const rides = await query

    return rides
  } catch (error) {
    throw new Error(`Erro ao buscar as corridas: ${error.message}`)
  }
}

export async function getDriverById(driverId: number) {
  try {
    const driver = await knex('drivers').where('id', driverId).first()
    return driver
  } catch (error) {
    throw new Error(`Erro ao buscar o motorista: ${error.message}`)
  }
}
