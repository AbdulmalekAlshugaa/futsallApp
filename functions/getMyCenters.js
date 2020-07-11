const Centers = require('../model/centers')

const getMyCenters = async (ownerEmail) => {
  try {
    const centers = await Centers.find({ ownerEmail })
    return centers
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getMyCenters
