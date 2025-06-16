import express from 'express'

const app = express()

app.use(express.json())

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`)
  next()
}

const resolveIndexByUserId = (request, response, next) => {
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

// app.use(loggingMiddleware)

const PORT = process.env.PORT || 3000

const mockUsers = [
  { id: 1, username: 'anson', displayName: 'AnsonDi' },
  { id: 2, username: 'magma', displayName: 'MagmaFellow' },
  { id: 3, username: 'alice', displayName: 'Alice' },
  { id: 4, username: 'tina', displayName: 'Tina' },
  { id: 5, username: 'lina', displayName: 'Lina' },
  { id: 6, username: 'gave', displayName: 'Gave' },
  { id: 7, username: 'rex', displayName: 'Rex' },
]

app.get('/', loggingMiddleware, (request, response) => {
  response.status(201).send({
    msg: 'hello!',
  })
})

app.get('/api/users', (request, response) => {
  let filterField = request.query.filter
  let filterSubstring = request.query.value
  if (!(filterField in mockUsers[0])) {
    filterField = 'username'
    filterSubstring = ''
  }

  const filteredUsers = mockUsers.filter(user =>
    user[filterField]?.includes(filterSubstring)
  )

  response.send(filteredUsers)
})

app.post('/api/users', (request, response) => {
  const { body } = request
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...body,
  }
  mockUsers.push(newUser)
  return response
    .status(201)
    .send({ msg: 'Successfuly added a new user', data: newUser })
})

app.get('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request
  const findUser = mockUsers[findUserIndex]
  if (!findUser) return response.sendStatus(404)

  return response.send({ data: findUser, msg: 'OK' })
})

app.get('/api/products', (request, response) => {
  response.send([
    { id: 123, name: 'chicken breast', price: 12.99 },
    { id: 145, name: 'fish steak', price: 53.99 },
  ])
})

app.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request
  mockUsers[findUserIndex] = { ...body, id: mockUsers[findUserIndex].id }
  return response.sendStatus(200)
})

app.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return response.sendStatus(200)
})

app.delete('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request
  mockUsers.splice(findUserIndex, 1)
  return response.sendStatus(200)
})
// You can provide request.body (or payload) but it is not necessary

app.listen(PORT, () => {
  console.log(`Check it out http://localhost:${PORT}`)
})
