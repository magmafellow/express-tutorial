import { Router } from 'express'
import { checkSchema, matchedData, validationResult } from 'express-validator'
import {
  createUserValidationSchema,
  getUserValidationSchema,
} from '../utils/validation-schemas.mjs'
import {
  resolveUserByUsername,
} from '../utils/middlewares.mjs'
import { User } from '../mongoose/schemas/user.mjs'
import { hashPassword } from '../utils/helpers.mjs'
import { deleteUserByUsername, getAllUsers, updateUserByUsername } from '../actions/users.mjs'

const router = Router()

/* API FOR: /api/users */

router.get(
  '/',
  // checkSchema(getUserValidationSchema),
  async (request, response) => {
    let filterField = request.query.filter
    let filterSubstring = request.query.value

    const result = validationResult(request)

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() })

    const allUsers = await getAllUsers()

    if (!(filterField in allUsers[0])) {
      filterField = 'username'
      filterSubstring = ''
    }

    const filteredUsers = allUsers.filter(user =>
      user[filterField]?.includes(filterSubstring)
    )

    response.send(filteredUsers)
  }
)

router.get('/:username', resolveUserByUsername, async (request, response) => {
  const { foundUser } = request

  if (!foundUser) return response.sendStatus(404)

  return response.send({ data: foundUser, msg: 'OK' })
})

router.post(
  '/',
  checkSchema(createUserValidationSchema),
  async (request, response) => {
    const result = validationResult(request)
    if (!result.isEmpty()) return response.status(400).send(result.array())

    const data = matchedData(request)
    data.password = await hashPassword(data.password)
    const newUser = new User(data)
    try {
      const savedUser = await newUser.save()
      return response.status(201).send(savedUser)
    } catch (err) {
      console.log(err)
      return response.sendStatus(400)
    }
  }
)

router.put('/:username', resolveUserByUsername, async (request, response) => {
  const { body, foundUser } = request
  User.replaceOne({ username: foundUser.username }, { ...body })
  return response.sendStatus(200)
})

router.patch('/:username', resolveUserByUsername, async (request, response) => {
  const { body, foundUser } = request
  const result = await updateUserByUsername(foundUser.username, body)
  return response.sendStatus(200)
})

router.delete(
  '/:username',
  resolveUserByUsername,
  async (request, response) => {
    const { foundUser } = request
    const result = await deleteUserByUsername(foundUser.username)
    return response.sendStatus(200)
  }
)

export default router
