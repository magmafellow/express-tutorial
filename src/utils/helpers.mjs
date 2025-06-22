import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds)
  const donePassword = await bcrypt.hash(password, salt)
  return donePassword
}

export const comparePassword = async (encrypted, plain) => {
  return await bcrypt.compare(plain, encrypted)
}
