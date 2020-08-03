const Team = require('../model/team')

const getTeamById = async (id) => {
  try {
    const team = await Team.findOne({ id })
    return team
  } catch (error) {
    console.log(error)
  }
}

module.exports = getTeamById
