import { Router } from 'express'
import { checkSchema, matchedData, validationResult } from 'express-validator'
import {
  createUserValidationSchema,
  getUserValidationSchema,
} from '../utils/validation-schemas.mjs'
import { mockUsers } from '../utils/constants.mjs'
import { resolveIndexByUserId } from '../utils/middlewares.mjs'

const router = Router()

/* API FOR: /api/users */ 

router.get(
  '/',
  // checkSchema(getUserValidationSchema),
  (request, response) => {
    let filterField = request.query.filter
    let filterSubstring = request.query.value

    const result = validationResult(request)

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() })

    if (!(filterField in mockUsers[0])) {
      filterField = 'username'
      filterSubstring = ''
    }

    const filteredUsers = mockUsers.filter(user =>
      user[filterField]?.includes(filterSubstring)
    )

    response.send(filteredUsers)
  }
)

router.get('/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request
  const findUser = mockUsers[findUserIndex]
  if (!findUser) return response.sendStatus(404)

  return response.send({ data: findUser, msg: 'OK' })
})

router.post(
  '/',
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request)
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() })

    const data = matchedData(request)
    const newUser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      ...data,
    }

    mockUsers.push(newUser)
    return response
      .status(201)
      .send({ msg: 'Successfuly added a new user', data })
  }
)

router.put('/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request
  mockUsers[findUserIndex] = { ...body, id: mockUsers[findUserIndex].id }
  console.log('new user in put', { ...body, id: mockUsers[findUserIndex].id })
  return response.sendStatus(200)
})

router.patch('/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return response.sendStatus(200)
})

router.delete('/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request
  mockUsers.splice(findUserIndex, 1)
  return response.sendStatus(200)
})

export default router
