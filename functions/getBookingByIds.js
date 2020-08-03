const Booking = require('../model/booking')
const Center = require('../model/centers')

const getBookingById = async (bookinfIds) => {
  try {
    const booking = await Booking.find({ id: { $in: bookinfIds } }).lean()
    const centers = await Center.find({ id: { $in: booking.map(b => b.centerId) } })
    return booking.map(b => {
      const center = centers.find(c => c.id === b.centerId)
      return { ...b, center }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = getBookingById
