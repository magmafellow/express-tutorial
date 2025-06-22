import express from 'express'
import routes from './routes/index.mjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { mockUsers } from './utils/constants.mjs'

const app = express()
const PORT = process.env.PORT || 3000

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
  })
)

// ROOT for routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Check it out http://localhost:${PORT}`)
})
