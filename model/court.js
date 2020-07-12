const { Schema, model } = require('../config/mongo')


const courtModel = new Schema({
  name:{
    type:String,
    required:true
  },
  id:{
    type:String,
    required:true
  },
  centerId:{
    type:String,
    required:true
  },
  capacity:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true

  }
 





})

const court =  model('court', courtModel)

module.exports = court