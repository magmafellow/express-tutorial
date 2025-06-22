import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../mongoose/schemas/user.mjs'
import { comparePassword } from '../utils/helpers.mjs'

passport.serializeUser((user, done) => {
  console.log('.serializeUser()')
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  console.log('.deserializeUser()')
  try {
    const findUser = await User.findById(id)
    if (!findUser) throw new Error('User not found')
    done(null, findUser)
  } catch (err) {
    done(err, null)
  }
})

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username })
      if (!findUser) throw new Error('User not found. in verify cb')
      const isPasswordMatch = await comparePassword(findUser.password, password)
      if (!isPasswordMatch) {
        throw new Error('Bad credentials. in verify cb')
      }

      done(null, findUser)
    } catch (err) {
      done(err, null)
    }
  })
)

export default passport
