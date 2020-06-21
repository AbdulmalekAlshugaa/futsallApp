const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URL,
     { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('mogno connected')).catch(err => console.log(err))

module.exports = mongoose