const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../utility/auth')

// @desc   Register user
// @route  POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // check if user exist
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc   Register user
// @route  POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  // check for user email and password
  const user = await User.findOne({ email })
  if(user && await bcrypt.compare(password, user.password)){
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })
  }else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const {id, name, email} = await User.findById(req.user.id)
  res.status(200).json({
    id,
    name,
    email
  })
})

module.exports = {
  registerUser,
  loginUser,
  getMe
}
