import express from 'express'
import { router } from './routes/index.js'
import cors from 'cors'

const server = express()

server.use(
  cors({
    origin: 'http://localhost',
    credentials: true,
  }),
)

server.get('/config/google-api-key', (req, res) => {
  res.json({ googleApiKey: process.env.GOOGLE_API_KEY })
})
server.use(express.json())
server.use(router)

server.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`)
  next()
})

export { server }
