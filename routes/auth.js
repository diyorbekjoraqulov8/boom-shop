import { Router } from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { generateJWTToken } from "../services/token.js"

const router = Router()

// GET
router.get('/login', (req, res) => {
  if (req.cookies.token) {
    res.redirect('/')
    return
  }
  res.render('login', {
    title: "Login | Boom shop",
    isLogin: true,
    loginError: req.flash('loginError')
  })
})

router.get('/register', (req, res) => {
  if (req.cookies.token) {
    res.redirect('/')
    return
  }
  res.render('register', {
    title: "Register | Boom shop",
    isRegister: true,
    registerError: req.flash('registerError')
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
})

// POST
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    req.flash('loginError', "All fields is required")
    res.redirect('/login')
    return
  }

  const existUser = await User.findOne({email})
  if (!existUser) {
    req.flash('loginError', 'User not found')
    res.redirect('/login')
    return
  }
  const isPassEqual = await bcrypt.compare(password, existUser.password)
  if (!isPassEqual) {
    req.flash('loginError', 'Password wrong')
    res.redirect('/login')
    return
  }

  const token = generateJWTToken(existUser._id)
  res.cookie('token', token, {httpOnly:true, secure:true})
  res.redirect('/')
})

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  if (!firstname) {
    req.flash('registerError', 'First Name is required')
    res.redirect('/register')
    return
  } else if (!lastname) {
    req.flash('registerError', 'Last Name is required')
    res.redirect('/register')
    return
  } else if (!email) {
    req.flash('registerError', 'Email is required')
    res.redirect('/register')
    return
  } else if (!password) {
    req.flash('registerError', 'Password is required')
    res.redirect('/register')
    return
  }

  const condidate = await User.findOne({email})

  if (condidate) {
    req.flash('registerError', 'User alredy exist')
    res.redirect('/register')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const userData = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    password: hashedPassword
  }
  const user = await User.create(userData)
  const token = generateJWTToken(user._id)

  res.cookie('token', token, {httpOnly:true, secure:true})
  res.redirect('/')
})

export default router