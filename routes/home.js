const express = require('express')
const Pizza = require('../models/pizza')
const router = express.Router()

router.get('/', async (req, res) => {
  const pizzas = await Pizza.find()
  return res.render('home', { pizzas: pizzas })
})

module.exports = router
