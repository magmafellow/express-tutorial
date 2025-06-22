import passport from 'passport'
import { Strategy } from 'passport-discord'
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '../utils/constants.mjs'
import { DiscordUser } from '../mongoose/schemas/discord-user.mjs'

passport.serializeUser((user, done) => {
  console.log('serialize -> user: ', user)
  console.log('serialize -> user.id: ', user.id)
  console.log('serialize -> user._id: ', user._id)
  console.log('serialize -> typeof user.id: ', typeof user.id)
  console.log('serialize -> typeof user._id: ', typeof user._id)


  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await DiscordUser.findById(id)
    if (!findUser) throw new Error('User not found')
    done(null, findUser)
  } catch (err) {
    done(err, null)
  }
})

export default passport.use(
  new Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: REDIRECT_URL,
      scope: ['identify'],
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser
      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id })
      } catch (error) {
        return done(error, null)
      }

      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          })
          const newSavedUser = await newUser.save()
          console.log('saved to database')
          return done(null, newSavedUser)
        }
        return done(null, findUser)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)
