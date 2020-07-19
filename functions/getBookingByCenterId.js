const Booking = require('../model/booking')

const getBookingByCenterId = async (centerId) => {
  try {
    const booking = await Booking.find({ centerId: { $in: centerId } })
    return booking
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getBookingByCenterId
