import { Router } from 'express'
import { mockUsers } from '../utils/constants.mjs'

const router = Router()

router.post('/', (req, res) => {
  const {
    body: { username, password },
  } = req

  const findUser = mockUsers.find(user => user.username === username)
  if (!findUser || findUser.password !== password) {
    return res.status(401).send({ msg: 'Bad credentials.' })
  }

  req.session.user = findUser

  return res.status(200).send({ data: findUser, status: 'OK' })
})

router.get('/status', (req, res) => {
  return req.session.user
    ? res.status(200).send({ data: req.session.user, status: 'OK' })
    : res
        .status(401)
        .send({ data: null, msg: 'Not Authenticated', status: 'NOT OK' })
})

export default router
