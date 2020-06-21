const { Schema, model } = require('../config/mongo')
const isEmail = require('validator/lib/isEmail')


const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Email is not valid']
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['OWNER', 'ADMIN', 'PLAYER']
  }
})

const users = model('Users', UserSchema)

module.exports = users
