const mongoose = require('../config/mongo')

const booking = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  centerId: {
    type: String,
    required: true
  },
  courtId: {
    type: String,
    required: true
  },
  from: String,
  to: String,
  date: {
    required: true,
    type: Date
  }
})

module.exports = mongoose.model('booking', booking)