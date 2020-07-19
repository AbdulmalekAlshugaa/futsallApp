
const mongoose = require('../config/mongo')


const playersSchame = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },

  postion:{
    type:String,
    required:false
  
  },
  description:{
    type:String,
    required:true
  }
}, { timestamps: true })

const players = mongoose.model('players', playersSchame)

module.exports = players

