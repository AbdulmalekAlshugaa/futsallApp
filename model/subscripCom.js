// name , from , to , time , description 
const {Schema, model} = require('../config/mongo')

const createSubscripe = new Schema({
    id:{
        required:true,
        type:String
    },
    competitionId:{
        required:true,
        type:String
    },
    captainEmail:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    listofmyPlayers:{
        required:true,
        type:Array
    },
    decription:{
        required:true,
        type:String
    }
    

    
})

const Subscription =  model('Subscription', createSubscripe)

module.exports = Subscription

