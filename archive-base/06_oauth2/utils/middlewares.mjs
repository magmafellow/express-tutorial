import { getUserByUsername } from "../actions/users.mjs"
import { User } from "../mongoose/schemas/user.mjs"
import { mockUsers } from "./constants.mjs"

export const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return response.sendStatus(404)
  request.findUserIndex = findUserIndex
  next()
}


export const resolveUserByUsername = async (request, response, next) => {
  const { params: { username } } = request
  

  const foundUser = await getUserByUsername(username)
  if (!foundUser) return response.sendStatus(404)

  request.foundUser = foundUser
  next()
}
