const express = require('express')
const { addToCart } = require('../controllers/cart')
const router = express.Router()

router.get('/cart', (req, res) => {
  res.render('customers/cart')
})

router.post('/add-to-cart', addToCart)

module.exports = router
