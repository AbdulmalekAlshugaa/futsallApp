// name , from , to , time , description 
const {Schema, model} = require('../config/mongo')

const createCompetitionModel = new Schema({
    id:{
        required:true,
        type:String

    }, 
    centerId:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    from:{
        required:true,
        type:Date
    },
    to:{
        required:true,
        type:Date

    },
    time:{
        required:true,
        type:Date
    },
    decription:{
        required:true,
        type:String
    },
    prize:{
        required:true,
        type:String

    }
    

    
})

const Competition =  model('Competition', createCompetitionModel)

module.exports = Competition

