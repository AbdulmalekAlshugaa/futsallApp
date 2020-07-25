const Center = require('../model/court')

const findCourts = async (centerId) => {
  try {
    const Courtscenter = await Center.find({ centerId })

    return Courtscenter
  } catch (error) {
    console.log(error)
  }
}

module.exports = findCourts
