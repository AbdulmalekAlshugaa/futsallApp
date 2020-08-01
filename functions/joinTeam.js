/// send 
const Jointeam = require('../model/joinTeam')
const  { v4: uuidv4 } = require('uuid')
// create a function that get the request 

const senInvition = async (inivtionPayload) => { // name and ...
    try{
        senInvition.id = uuidv4()
        // get all the username
        const jointeam = new Jointeam(inivtionPayload)
        await jointeam.save()
        return true;   
    }catch(error){
        console.log(error)
        throw error
    }

}

module.exports = senInvition