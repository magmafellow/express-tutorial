import { Router } from 'express'
import { mockUsers } from '../utils/constants.mjs'
import passport from 'passport'

const router = Router()

router.post('/', passport.authenticate('local'), (req, res) => {
  return res.sendStatus(200)
})

router.get('/status', (req, res) => {
  console.log('inside /auth/status endpoint')
  console.log('user: ', req.user)

  return req.user ? res.send({ data: req.user }) : res.sendStatus(401)
})

router.post('/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401)  // not Authenticated

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    return res.sendStatus(200)
  })

})

export default router
