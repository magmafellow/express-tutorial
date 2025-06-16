import express from 'express'

const app = express()

app.use(express.json())

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

app.get('/', (request, response) => {
  response.status(201).send({
    msg: 'hello!',
  })
})

app.get('/api/users', (request, response) => {
  console.log(request.query)
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

app.get('/api/users/:id', (request, response) => {
  const parsedId = parseInt(request.params.id)
  if (isNaN(parsedId)) {
    return response.status(400).send({
      msg: 'Bad request',
      details: `Invalid ID <${request.params.id}>`,
    })
  }

  const foundUser = mockUsers.find(user => user.id === parsedId)
  if (!foundUser) {
    response.sendStatus(404)
  }

  return response.send({ data: foundUser, msg: 'OK' })
})

app.get('/api/products', (request, response) => {
  response.send([
    { id: 123, name: 'chicken breast', price: 12.99 },
    { id: 145, name: 'fish steak', price: 53.99 },
  ])
})

app.put('/api/users/:id', (request, response) => {
  const {
    body,
    params: { id },
  } = request

  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return response.sendStatus(404)

  // total update, excluding id
  mockUsers[findUserIndex] = { ...body, id: parsedId }

  return response
    .status(200)
    .send({
      msg: `Successfuly put the user[${parsedId}]`,
      data: mockUsers[findUserIndex],
    })
})

app.patch('/api/users/:id', (request, response) => {
  const {
    body,
    params: { id },
  } = request
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return response.sendStatus(404)

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }

  return response
    .status(200)
    .send({
      msg: `Successfuly patched the user[${parsedId}]`,
      data: mockUsers[findUserIndex],
    })
})

app.delete('/api/users/:id', (request, response) => {
  const { params: { id } } = request

  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(400)  // BAD request
  const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return response.sendStatus(404)
  mockUsers.splice(findUserIndex, 1)
  return response.sendStatus(200)
})
// You can provide request.body (or payload) but it is not necessary


app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
