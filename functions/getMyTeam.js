const Team = require('../model/team')

const getMyTeam = async (captainEmail,Email) => {
  try {
    const team = await Team.find({ captainEmail })
    const t = await Team.find({ "listOfPlayers.email": Email })

    return [...team, ...t]
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getMyTeam