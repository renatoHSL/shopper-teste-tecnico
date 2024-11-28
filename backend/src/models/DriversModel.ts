import knex from 'knex'
import config from '../../knexfile.js'

const db = knex(config.development)

export async function getDriverById(driverId: number) {
  try {
    const driver = await db('drivers').where({ id: driverId }).first()
    return driver
  } catch (error) {
    throw new Error(`Erro ao buscar o motorista: ${error.message}`)
  }
}
