import { User } from '../mongoose/schemas/user.mjs'

export async function getAllUsers() {
  let users = []

  try {
    users = await User.find()
  } catch (error) {
    throw new Error('Error when getting all users from DB.')
  }

  return users
}

export async function getUserByUsername(username) {
  let user = null
  try {
    user = await User.findOne({ username })
  } catch (error) {
    throw new Error('Error when getting the user by username from DB.')
  }

  return user
}

export async function updateUserByUsername(username, updateObj) {
  try {
    const updatedUser = await User.updateOne({ username }, updateObj)
    return updatedUser
  } catch (error) {
    throw new Error('Error when updating the user by username in DB.')
  }
}

export async function deleteUserByUsername(username) {
  try {
    const result = await User.deleteOne({ username })
    return result
  } catch (error) {
    throw new Error('Error when deleting the user by username in DB.')
  }
}
