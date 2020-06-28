const { Schema,model } = require('../config/mongo')


const teamScame = new Schema({
  orgnizerId:{
    required:true,
    type:String
  },
  start:{
    required:true,
    type:Date
  },
  end:{
    required:true,
    type:Date
  },
  listOfPlayers:{
    required:true,
    type:Array
  }

})

const team = model ('team', teamScame)

module.exports = team