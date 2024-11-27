import path from 'path'
import { Database } from 'sqlite3'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.resolve(__dirname, './src/database/db/app.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, './src/database/migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, './src/database/seeds'),
    },
    pool: {
      afterCreate: (
        connection: Database,
        done: (err: Error | null) => void,
      ) => {
        connection.run('PRAGMA foreign_keys = ON', (err) => {
          done(err)
        })
      },
    },
  },
  // test: {
  //   client: 'sqlite3',
  //   useNullAsDefault: true,
  //   connection: ':memory:',
  //   migrations: {
  //     directory: path.resolve(__dirname, './src/database/migrations'),
  //   },
  //   seeds: {
  //     directory: path.resolve(__dirname, './src/database/seeds'),
  //   },
  //   pool: {
  //     afterCreate: (
  //       connection: Database,
  //       done: (err: Error | null) => void,
  //     ) => {
  //       connection.run('PRAGMA foreign_keys = ON', (err) => {
  //         done(err)
  //       })
  //     },
  //   },
  // },
  // production: {
  //   client: 'sqlite3',
  //   useNullAsDefault: true,
  //   connection: {
  //     filename: path.resolve(__dirname, './src/database/db/production.sqlite'),
  //   },
  //   migrations: {
  //     directory: path.resolve(__dirname, './src/database/migrations'),
  //   },
  //   seeds: {
  //     directory: path.resolve(__dirname, './src/database/seeds'),
  //   },
  //   pool: {
  //     afterCreate: (
  //       connection: Database,
  //       done: (err: Error | null) => void,
  //     ) => {
  //       connection.run('PRAGMA foreign_keys = ON', (err) => {
  //         done(err)
  //       })
  //     },
  //   },
  // },
}

export default config
