const { Schema,model } = require('../config/mongo')


const teamScame = new Schema({
  id:{
    type:String,
    required:true

  },
  captainEmail:{
    type:String,
    required:true
   
  },

  from:{
    required:true,
    type:String
  },
  to:{
    required:true,
    type:String
  },
  date:{
    required:true,
    type:Date

  },
  status:{
    required:true,
    type:String,
    default:"PENDDING"
  },
  listOfPlayers:{
    required:true,
    type:Array,
    default:[""]
  
  }

}, { timestamps: true })

const team = model ('team', teamScame)

module.exports = team