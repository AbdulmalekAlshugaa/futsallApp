const Center = require('../model/centers')

const findNearCenter = async ({ longitude, latitude, max = 1000 }) => {
  try {
    const centers = await Center.find({
      status: 'APPROVED',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: max,
          $minDistance: 0
        }
      }
    }).lean()
    return centers
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = findNearCenter
