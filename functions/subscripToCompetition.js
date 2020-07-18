const Subscrip = require('../model/subscripCom')
const  { v4: uuidv4 } = require('uuid')
// create a function that get the request 
const SubscripTo = async (team) => {
     // name and ...
    try{
        // get all the username
        const subscripCom = new Subscrip({competitionId:uuidv4(),...team})
       await subscripCom.save()
        return true;
    }catch(error){
        console.log(error)
        throw error
    }

}

module.exports = SubscripTo