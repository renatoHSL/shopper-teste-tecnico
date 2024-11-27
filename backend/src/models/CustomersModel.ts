import { Knex } from 'knex'

class CustomerModel {
  private tableName = 'customers'

  constructor(private knex: Knex) {}

  async create(): Promise<number> {
    const [id] = await this.knex(this.tableName).insert({}).returning('id')
    return id
  }

  async exists(customer_id: number): Promise<boolean> {
    const customer = await this.knex(this.tableName)
      .select('id')
      .where({ id: customer_id })
      .first()
    return !!customer
  }
}

export default CustomerModel
