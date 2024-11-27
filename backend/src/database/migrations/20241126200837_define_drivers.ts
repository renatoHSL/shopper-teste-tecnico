import { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema
    .createTable('drivers', (table) => {
      table.bigIncrements('id').primary().index()
      table.string('name', 150).notNullable().index()
      table.string('description', 255).notNullable()
      table.string('vehicle', 150).notNullable()
      table.string('rating', 500).notNullable()
      table.decimal('rate_per_km', 10, 2).notNullable()
      table.integer('min_km').notNullable()

      table.comment('Tabela usada para armazenar motoristas do sistema.')
    })
    .then(() => {
      console.log(`# Created table drivers`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('drivers').then(() => {
    console.log(`# Dropped table drivers`)
  })
}
