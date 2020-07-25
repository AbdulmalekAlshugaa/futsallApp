const geocoder = require('../config/geocoder')

const getLocation = async (address) => {
  try {
    const res = await geocoder.geocode(address)
    console.log('res', res)
    if (res.length > 0 && res[0].country !== 'Malaysia') {
      return []
    }
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getLocation
