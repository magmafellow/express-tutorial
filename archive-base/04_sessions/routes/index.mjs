import { Router } from 'express'
import usersRouter from './users.mjs'
import productsRouter from './products.mjs'
import cartRouter from './cart.mjs'
import authRouter from './auth.mjs'

const router = Router()

router.use('/users', usersRouter)
router.use('/products', productsRouter)
router.use('/cart', cartRouter)
router.use('/auth', authRouter)

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'api page' })
})

export default router
