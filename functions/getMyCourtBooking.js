const Booking = require('../model/booking')

const getMyCourtBooking = async (userId) => {
  try {
    const booking = await Booking.find({ userId })
    return booking
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getMyCourtBooking
