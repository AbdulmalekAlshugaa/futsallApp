const { Schema, model } = require('../config/mongo')


const courtModel = new Schema({
  centerId:{
    type:String,
    required:true
  },
  capcity:{
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