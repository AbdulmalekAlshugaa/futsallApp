const Users = require('../model/users')

const getMultipleUsers = async (emails) => {
  const users = Users.find({ email: { $in: emails } })
  return users
}

module.exports = getMultipleUsers
