import knex from 'knex'
import config from '../../knexfile.js'

// Inicializa a instância do knex usando o ambiente de desenvolvimento
const db = knex(config['development'])

export default db
