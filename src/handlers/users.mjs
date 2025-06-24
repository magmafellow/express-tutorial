export const returnFoundUser = async (request, response) => {
  const { foundUser } = request
  if (!foundUser) return response.sendStatus(404)
  return response.send({ data: foundUser, msg: 'OK' })
}
