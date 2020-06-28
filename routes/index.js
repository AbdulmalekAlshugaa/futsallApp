const routs = require('express').Router()
const crypto = require('crypto')
const createUser = require('../functions/createUser')
const findUserByEmail = require('../functions/findUser')

routs.post('/createUser', async (req, res) => {
// send json
  try {
    const { name, email, password, phone, role } = req.body

    const ePassword = crypto.createHmac('sha256', process.env.hashingSecret) // encrypt password
      .update(password).digest('hex') // passing the password

    await createUser({ name, password: ePassword, email, phone, role })

    res.json({
      message: 'SUCCESS'
    })
    //
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

routs.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const ePassword = crypto.createHmac('sha256', process.env.hashingSecret) // encrypt password
      .update(password).digest('hex') // passing the password

    const user = await findUserByEmail(email)

    if (!user) {
      throw new Error('User not found')
    } else if (user.password !== ePassword) {
      throw new Error('Passowrd is wrong')
    }

    res.cookie('email', user.email, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 8640000000)
    })
    res.json({
      user
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = routs
