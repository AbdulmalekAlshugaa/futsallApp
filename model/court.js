const { Schema, model } = require('../config/mongo')


const courtModel = new Schema({
  statrt:{
    required:true,
    type:Date
  },
  end:{
    required:true,
    type:Date
  },
  bokkedBy:{
    required:require,
    type:true

  }




})

const court =  model('court', courtModel)

module.exports = court