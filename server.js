const express = require('express')
const path = require('path')
require('dotenv').config()
const morgan = require('morgan')
const ejsLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
app.use(ejsLayout)
app.set('views', 'views')
app.set('view engine', 'ejs')

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// templates

app.get('/', (req, res) => {
  res.render('home')
})

mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB connected'))
  .catch(error => console.log(error))
const PORT = +process.env.PORT || 3000
app.listen(PORT, () => console.log('http://localhost:3000'))
