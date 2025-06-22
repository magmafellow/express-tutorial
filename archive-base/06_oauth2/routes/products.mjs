import { Router } from 'express'

const router = Router()

/* API FOR: /api/products */

router.get('/', (request, response) => {
  return response.sendStatus(200)
})

export default router
