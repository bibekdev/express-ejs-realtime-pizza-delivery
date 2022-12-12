const User = require('../models/user')
const argon2 = require('argon2')

exports.registerUser = async (req, res) => {
  const { email, password, name } = req.body

  if (!name || !email || !password) {
    req.flash('error', 'All fields are required')
    req.flash('email', email)
    req.flash('name', name)
    return res.render('register')
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    req.flash('error', 'User already exists')
    req.flash('email', email)
    req.flash('name', name)
    return res.render('register')
  }

  const hashedPassword = await argon2.hash(password)

  const user = new User({
    name,
    email,
    password: hashedPassword,
  })
  await user.save()
  return res.redirect('/login')
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    req.flash('error', 'User not found')
    req.flash('email', email)
    return res.render('login')
  }

  const passwordMatched = await argon2.verify(user.password, password)
  if (!passwordMatched) {
    req.flash('error', 'Wrong password')
    req.flash('email', email)
    return res.render('login')
  }

  req.session.user = user
  return res.redirect('/')
}

exports.logoutUser = async (req, res) => {
  if (req.session.user) {
    req.session.user = undefined
    return res.redirect('/')
  }
}
