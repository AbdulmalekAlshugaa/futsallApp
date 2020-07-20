const Centers = require('../model/centers')

const getAllCenters = async () => {
  try {
    const centers = await Centers.find({}).sort({ createdAt: -1 })
    return centers
  } catch (error) {
    console.log(error)
  }
}

module.exports = getAllCenters
