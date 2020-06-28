const Users = require('../model/users')

// create a function that get the request 
const getUserName = async (role) => {
    try {
        // get all the users 
    const users = await Users.find({ role : role.toUpperCase()})
  
    console.log('users', users)
      return users
    } catch (error) {
      console.log(error)
    }
  }

module.exports = getUserName