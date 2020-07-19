const Booking = require('../model/booking')

const removeBookingById = async (bookingId) => {
  await Booking.deleteOne({ id: bookingId })
}

module.exports = removeBookingById
