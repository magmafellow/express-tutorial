import { Router } from 'express'

const router = Router()

/* API FOR: /api/products */

router.get('/', (request, response) => {
  response.send([
    { id: 123, name: 'chicken breast', price: 12.99 },
    { id: 145, name: 'fish steak', price: 53.99 },
  ])
})

export default router
