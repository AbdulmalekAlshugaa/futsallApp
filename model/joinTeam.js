const mongoose = require('../config/mongo')

const joinTeam = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  PlayerEmail: {
    type: String,
    required: true
  },
  captainEmail: {
    type: String,
    required: true
  },
  status :{
    type: String,
    required: true
  }
}


)

module.exports = mongoose.model('jointeam', joinTeam)