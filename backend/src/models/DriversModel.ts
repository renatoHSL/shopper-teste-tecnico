import knex from '../database/connection'

export class DriverModel {
  static async findDriverById(id: number) {
    return knex('drivers').where({ id }).first()
  }
}
