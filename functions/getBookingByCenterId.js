const Booking = require('../model/booking')
const Courts = require('../model/court')

const getBookingByCenterId = async (centerId) => {
  try {
    const booking = await Booking.find({ centerId: { $in: centerId } }).sort({ date: -1 }).lean()
    const courtsId = booking.map(b => b.courtId)
    const courts = await Courts.find({ id: { $in: courtsId } }).lean()
    return booking.map(b => {
      const court = courts.find(c => c.id === b.courtId)
      return { ...b, court }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getBookingByCenterId
