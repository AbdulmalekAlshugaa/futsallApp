const center = require('../model/centers')
const getCenterByID = async (id) => {
  try {
    const getCenter = await center.findOne({ id })

    return getCenter
  } catch (err) {
    console.log(err)
  }
}

module.exports = getCenterByID

