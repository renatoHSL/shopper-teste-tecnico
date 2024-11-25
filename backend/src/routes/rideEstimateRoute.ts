import { Router } from 'express'

const router = Router()

router.post('/teste', (req, res) => {
  console.log(req.body)

  res.json('Post funcionando')
})

export default router
