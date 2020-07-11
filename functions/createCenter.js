const Centers = require('../model/centers')
const { v4: uuidv4 } = require('uuid')

const createCenter = async (center) => {
  try {
    const newCenter = new Centers({ id: uuidv4(), ...center })
    await newCenter.save()
    return true
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = createCenter
