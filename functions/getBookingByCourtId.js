const Booking = require('../model/booking')

const getBookingByCourtId = async (courtId) => {
  try {
    const booking = await Booking.find({
      courtId
    })
    return booking
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getBookingByCourtId
