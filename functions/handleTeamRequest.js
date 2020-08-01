const Team = require('../model/team')

const handleTeamRequest = async (id, email, status) => {
  try {
    const team = await Team.findOne({ id })

    const listOfPlayers = team.listOfPlayers.map(p => {
      if (p.Email === email) {
        return { ...p, status }
      }
      return p
    })

    await Team.updateOne({ id }, { $set: { listOfPlayers } })
    return true
  } catch (error) {
    console.log(error)
  }
}

module.exports = handleTeamRequest
