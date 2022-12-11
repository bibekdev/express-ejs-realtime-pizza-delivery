const express = require('express')
const router = express.Router()

router.get('/cart', (req, res) => {
  res.render('customers/cart')
})

module.exports = router
