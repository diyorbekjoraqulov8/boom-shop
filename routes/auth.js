import { Router } from "express"
const router = Router()

router.get('/login', (req, res) => {
  res.render('login', {
    title: "Login | Boom shop",
    isLogin: true
  })
})

router.get('/register', (req, res) => {
  res.render('register', {
    title: "Register | Boom shop",
    isRegister: true
  })
})

export default router