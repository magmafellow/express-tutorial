import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  if (!req.session.user) return res.sendStatus(401)
  const { body: item } = req

  if (req.session.cart) {
    req.session.cart.push(item)
  } else {
    req.session.cart = [item]
  }

  return res.status(200).send({ data: req.session.cart })
})

router.get('/', (req, res) => {
  if (!req.session.user) return res.sendStatus(401)

  return res.status(200).send({ data: req.session.cart ?? [] })
})

export default router
