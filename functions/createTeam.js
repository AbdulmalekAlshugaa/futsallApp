const CreateTem = require('../model/team')
const { v4: uuid4 } = require('uuid')

// create a function that get the request 

const createUser = async (team) => { // name and ...
    try{
        // get all the username
        const newTeam = new CreateTem({ ...team, id: uuid4() })
        await newTeam.save()
        return true;   
    }catch(error){
        console.log(error)
        throw error
    }

}

module.exports = createUser