const Users = require('../model/users')

const createUser = async (user) => {
  try{
    const newuser = new Users(user)

    await newuser.save()

    return true
  }catch(error){
    console.log(error)
    throw error
  }
}


module.exports = createUser
