import { Router } from 'express'
import usersRouter from './users.mjs'
import productsRouter from './products.mjs'

const router = Router()

router.use('/users', usersRouter)
router.use('/products', productsRouter)

router.use('/', (req, res) => {
  res.cookie('hello', 'world', { maxAge: 1000 * 10 })  // secs * n
  res.status(200).send({ msg: 'main page' })
})

export default router
