const geocoder = require('../config/geocoder')

const getLocation = async (address) => {
  try {
    const res = await geocoder.geocode(address)
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getLocation
