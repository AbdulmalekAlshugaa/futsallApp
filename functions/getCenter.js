const Center = require('../model/centers')

const findcenterbyID = async (id) => {
  try {
    const center = await Center.findOne({ id })

    return center
  } catch (error) {
    console.log(error)
  }
}

module.exports = findcenterbyID
