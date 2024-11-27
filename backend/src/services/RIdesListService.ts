import { getDriverById } from '../models/RidesListModel.js'
import { getRidesByCustomer } from '../models/RidesListModel.js'

export async function getRidesService(customerId: string, driverId?: number) {
  if (!customerId) {
    throw new Error('CUSTOMER_ID_REQUIRED: O ID do cliente é obrigatório.')
  }

  if (driverId) {
    const driver = await getDriverById(driverId)
    if (!driver) {
      throw new Error('INVALID_DRIVER: O ID do motorista informado é inválido.')
    }
  }

  return await getRidesByCustomer(customerId, driverId)
}
