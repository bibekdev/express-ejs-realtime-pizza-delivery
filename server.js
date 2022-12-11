const express = require('express')
// const data = require('./data')
require('dotenv').config()
const morgan = require('morgan')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const ejsLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cartRoutes = require('./routes/cart')
const homeRoutes = require('./routes/home')

const app = express()

// templates
app.use(ejsLayout)
app.set('views', 'views')
app.set('view engine', 'ejs')

// app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.DB_URL,
      collection: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})
app.use('/', homeRoutes)
app.use('/', cartRoutes)

mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    // Pizza.insertMany(data)
  })
  .catch(error => console.log(error))
const PORT = +process.env.PORT || 3000
app.listen(PORT, () => console.log('http://localhost:3000'))
