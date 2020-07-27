const Team = require('../model/team')

const getMyTeam = async (email) => {
  try {
    const team = await Team.find({ captainEmail: email })
    const t = await Team.find({ 'listOfPlayers.Email': email })

    return [...team, ...t]
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getMyTeam
