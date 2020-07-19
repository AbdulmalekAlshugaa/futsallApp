const Booking = require('../model/booking')
const { v4: uuid4 } = require('uuid')

const bookingCourt = async (detail) => {
  try {
    const booking = new Booking({
      id: uuid4(),
      ...detail
    })
    await booking.save()
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = bookingCourt
