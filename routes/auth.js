import { Router } from "express"
const router = Router()

// GET
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

// POST
router.post('/login', (req, res) => {
  console.log(req.body);
  res.redirect('/')
})

router.post('/register', (req, res) => {
  console.log(req.body);
  res.redirect('/')
})

export default router