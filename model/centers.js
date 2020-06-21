const mongoose = require('../config/mongo')

const centerSchema = new mongoose.Schema({
  name: { // name of the ceneter
    type: String,
    required: true

  },
  ownerID: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  phoneNumber: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }

})

const centers = mongoose.model('centers', centerSchema)

module.exports = centers
