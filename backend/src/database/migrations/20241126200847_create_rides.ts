import { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema
    .createTable('rides', (table) => {
      table.bigIncrements('id').primary().index()
      table
        .bigInteger('customer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE')
      table
        .bigInteger('driver_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('drivers')
        .onDelete('CASCADE')
      table.timestamp('date_time').defaultTo(knex.fn.now()).notNullable()
      table.string('origin', 255).notNullable()
      table.string('destination', 255).notNullable()
      table.float('distance').notNullable()
      table.string('duration', 50).notNullable()
      table.decimal('value', 10, 2).notNullable()

      table.comment('Tabela usada para armazenar viagens realizadas.')
    })
    .then(() => {
      console.log(`# Created table rides`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('rides').then(() => {
    console.log(`# Dropped table rides`)
  })
}
