const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,

  workEthicScore: {
    type: Number,
    default: 0,
  },
  empathyScore: {
    type: Number,
    default: 0,
  },
  curiosityScore: {
    type: Number,
    default: 0,
  },
  attentionScore: {
    type: Number,
    default: 0,
  },
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
