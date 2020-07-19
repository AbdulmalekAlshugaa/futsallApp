const mongoose = require('../config/mongo')

const centerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'PENDING'
  },
  name: { // name of the ceneter
    type: String,
    required: true
  },
  ownerEmail: {
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
  address: {
    type: String
  },
  photos:{
    type: [String] 
  },
  workingHours:{
    from:String,
    to:String
  }


}, { timestamps: true })

const centers = mongoose.model('centers', centerSchema)

module.exports = centers
