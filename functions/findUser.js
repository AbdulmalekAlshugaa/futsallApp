const Users = require('../model/users')

const findUserByEmail = async (email) => {
  try {
    const user = await Users.findOne({ email })

    return user
  } catch (error) {
    console.log(error)
  }
}

module.exports = findUserByEmail
