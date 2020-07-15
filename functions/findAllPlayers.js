// get user based on thier players postion
const Users = require('../model/users')

// create a function that get the request 
const getPlayers = async (position) => {
    try {
        // get all the users 
    const users = await Users.find({ position : position.toUpperCase()})
  
    console.log('users', users)
      return users
    } catch (error) {
      console.log(error)
    }
  }

module.exports = getPlayers