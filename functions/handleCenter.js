const Center = require('../model/centers')

const approveCenter = async (centerId, type) => {
  await Center.updateOne({ id: centerId }, { $set: { status: type } })
  return true
}

module.exports = approveCenter
