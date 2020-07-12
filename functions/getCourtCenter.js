const Court = require('../model/court')

const getCourtCenter = async (centerId) => {
  try {
    const courts = await Court.find({ centerId })
    return courts
  } catch (error) {
    console.log(error)
  }
}

module.exports = getCourtCenter
