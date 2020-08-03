const { Schema, model } = require('../config/mongo')


const teamScame = new Schema({
  id:{
    type:String,
    required:true
  },
  captainEmail:{
    type:String,
    required:true
  },
  bookingId: String,
  status:{
    required:true,
    type:String,
    default:"PENDDING"
  },
  listOfPlayers:{
    required:true,
    type:Array,
    default:[]
  },
  type: {
    type: String,
    default: 'TEAM'
  }

}, { timestamps: true })

const team = model('team', teamScame)

module.exports = team
