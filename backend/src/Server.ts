import express from 'express'
import { router } from './routes/index.js'
import cors from 'cors'

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

server.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`)
  next()
})

export { server }
