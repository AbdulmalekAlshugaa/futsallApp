const Booking = require('../model/booking')
const Center = require('../model/centers')

const getMyCourtBooking = async (userId) => {
  try {
    const booking = await Booking.find({ userId }).lean()
    const centers = await Center.find({ id: { $in: booking.map(b => b.centerId) } }).lean()
    const teams = await Center.find({ bookingId: { $in: booking.map(b => b.id) } }).lean()
    return booking.map(b => {
      const center = centers.find(c => c.id === b.centerId)
      const team = teams.find(t => t.boookingId === b.id)
      return { ...b, center, team }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = getMyCourtBooking
