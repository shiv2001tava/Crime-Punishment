const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logout,
  workEthic,
  curiosity,
  attention,
  empathy,
  user,
  getalluser,
  loginA,
  reset,
} = require('../controller/authController')

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logout)
router.patch('/workEthic/:id', workEthic)
router.patch('/reset/:id', reset)
router.patch('/curiosity/:id', curiosity)

router.patch('/attention/:id', attention)

router.patch('/empathy/:id', empathy)

router.get('/user/:id', user)
router.get('/getalluser', getalluser)
router.post('/loginA', loginA)

module.exports = router
