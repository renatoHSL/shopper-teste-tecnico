import { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema
    .createTable('customers', (table) => {
      table.bigIncrements('id').primary().index()
      table.comment('Tabela usada para armazenar os consumidores do sistema.')
    })
    .then(() => {
      console.log('# Created table customers')
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('customers').then(() => {
    console.log('# Dropped table customers')
  })
}
