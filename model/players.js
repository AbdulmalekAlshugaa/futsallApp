
const mongoose = require('../config/mongo')


const playersSchame = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },

  postion:{
    type:String,
    required:true
  
  },
  description:{
    type:String,
    required:true
  }
})

const players = mongoose.model('players', playersSchame)

module.exports = players

