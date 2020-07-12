const Center = require('../model/court')

const findCourts = async (centiredID) => {
  try {
    const Courtscenter = await Center.find({centiredID })

    return Courtscenter
  } catch (error) {
    console.log(error)
  }
}

module.exports = findCourts






