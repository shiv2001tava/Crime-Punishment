const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
  res.json('test is working')
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name) {
      return res.json({
        error: 'Name is required',
      })
    }
    if (!password || password.length < 6) {
      return res.json({
        error: 'password is required and should be more than 5 characters',
      })
    }
    // check unique email
    const exist = await User.findOne({ email })
    if (exist) {
      return res.json({
        error: 'email already used',
      })
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return res.json(user)
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      console.log('hu')
      return res.json({
        error: 'No user found',
      })
    }

    const match = await comparePassword(password, user.password)
    if (match) {
      console.log('yes')
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie('token', token).json(user)
        }
      )
    }
    if (!match) {
      console.log('huhuhu')
      return res.json({
        error: 'incorrect password',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const loginA = async (req, res) => {
  try {
    const { email, password } = req.body
    const m1 = password === 'adminx123'
    const m2 = email === 'admin123@gmail.com'

    if (m1 && m2) {
      console.log('yes')
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie('token', token).json(user)
        }
      )
    } else {
      console.log('huhuhu')
      return res.json({
        error: 'incorrect password',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const getProfile = (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err
      res.json(user)
    })
  } else {
    res.json(null)
  }
}

const logout = async (req, res) => {
  console.log('hehe')
  res.status(200).cookie('token', '', -1).json({
    message: 'success',
  })
}

const workEthic = async (req, res) => {
  try {
    const { workEthicScore } = req.body
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const currentworkEthicScore = user.workEthicScore
    const updatedworkEthicScore = currentworkEthicScore + workEthicScore

    user.workEthicScore = updatedworkEthicScore

    await user.save()
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
}
const reset = async (req, res) => {
  try {
    console.log('js')
    const { workEthicScore } = 0
    const { attentionScore } = 0
    const { curiosityScore } = 0
    const { empathyScore } = 0

    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    user.workEthicScore = workEthicScore
    user.curiosityScore = curiosityScore
    user.empathyScore = empathyScore
    user.attentionScore = attentionScore

    await user.save()
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
}

const curiosity = async (req, res) => {
  try {
    console.log('js')
    const { curiosityScore } = req.body
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const currentcuriosity = user.curiosityScore
    const updatedcuriosityScore = currentcuriosity + curiosityScore
    user.curiosityScore = updatedcuriosityScore

    await user.save()
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
}

const attention = async (req, res) => {
  try {
    const { attentionScore } = req.body
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const currentattentionScore = user.attentionScore

    const updatedattentionScore = currentattentionScore + attentionScore

    user.attentionScore = updatedattentionScore

    await user.save()
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
}

const empathy = async (req, res) => {
  try {
    const { empathyScore } = req.body
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const currentempathyScore = user.empathyScore

    const updatedempathyScore = currentempathyScore + empathyScore

    user.empathyScore = updatedempathyScore

    await user.save()
    res.send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
}

const user = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({ message: 'User not Found' })
    }
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

const getalluser = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logout,
  workEthic,
  attention,
  curiosity,
  empathy,
  user,
  getalluser,
  loginA,
  reset,
}
