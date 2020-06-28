const CreateTem = require('../model/team')

// create a function that get the request 

const createUser = async (team) => { // name and ...
    try{

        // get all the username
        const newTeam = new CreateTem(team)

         await newTeam.get()

        return true;

        
    }catch(error){
        console.log(error)
        throw error
    }

}

module.exports = createUser