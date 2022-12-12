const express = require('express')
const { loginUser, registerUser, logoutUser } = require('../controllers/user')
const { guest } = require('../middlewares/auth')
const router = express.Router()

router.get('/login', guest, (req, res) => {
  res.render('login')
})
router.get('/register', guest, (req, res) => {
  res.render('register')
})

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/logout', logoutUser)

module.exports = router
