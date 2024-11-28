import { RidesModel } from '../models/RidesModel'
import { DriverModel } from '../models/DriverModel'

export class RidesService {
  static async confirmRide(data: any) {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = data

    // Validate input data
    if (!customer_id || !origin || !destination || !driver || !driver.id) {
      throw {
        code: 400,
        error_code: 'INVALID_DATA',
        message: 'Missing required fields.',
      }
    }
    if (origin === destination) {
      throw {
        code: 400,
        error_code: 'INVALID_DATA',
        message: 'Origin and destination cannot be the same.',
      }
    }

    // Validate driver
    const driverRecord = await DriverModel.findDriverById(driver.id)
    if (!driverRecord) {
      throw {
        code: 404,
        error_code: 'DRIVER_NOT_FOUND',
        message: 'Driver not found.',
      }
    }

    // Validate distance
    if (distance < driverRecord.min_km) {
      throw {
        code: 406,
        error_code: 'INVALID_DISTANCE',
        message: `Driver only accepts distances greater than ${driverRecord.min_km} km.`,
      }
    }

    // Save ride to the database
    await RidesModel.saveRide({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver_id: driver.id,
      value,
    })

    return { success: true }
  }
}
