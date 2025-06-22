import express from 'express'
import routes from './routes/index.mjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
// import './strategies/local-strategy.mjs'
import './strategies/discord-strategy.mjs'

const app = express()
const PORT = process.env.PORT || 3000

mongoose
  .connect(
    'mongodb://localhost:27017'
  )
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('Error while connecting to the db', err))

app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: 'anson the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    })
  })
)

app.use(passport.initialize())
app.use(passport.session())

// ROOT for routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Check it out http://localhost:${PORT}`)
})
