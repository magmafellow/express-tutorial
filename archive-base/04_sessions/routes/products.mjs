import { Router } from 'express'

const router = Router()

/* API FOR: /api/products */

router.get('/', (request, response) => {
  console.log('product. header cookie: ', request.headers.cookie)
  console.log('product. cookies: ', request.cookies)

  if (request.cookies.hello && request.cookies.hello === 'world') {
    return response.send([
      { id: 123, name: 'chicken breast', price: 12.99 },
      { id: 145, name: 'fish steak', price: 53.99 },
    ])
  }
  return response.status(401).send({ msg: 'Sorry you need a key' })
})

export default router
