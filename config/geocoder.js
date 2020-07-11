const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'google',
  apiKey: process.env.GCP_API, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder
