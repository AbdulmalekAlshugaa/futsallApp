const routs = require('express').Router()
const crypto = require('crypto')
const createUser = require('../functions/createUser')
const findUserByEmail = require('../functions/findUser')
const createTeam = require('../functions/createTeam')
const getUsers = require('../functions/getUsers')
const getLocation = require('../functions/getLocation')
const createCenter = require('../functions/createCenter')
const getMyCenters = require('../functions/getMyCenters')
const filemiddelware = require('../middleware/files')
const uploadFile = require('../functions/uploadFirebase')
const getCenter = require('../functions/getCenter')
//const updatePhoto = require('')



routs.post('/createUser', async (req, res) => {
// send json
  try {
    const { name, email, password, phone, role } = req.body

    const ePassword = crypto.createHmac('sha256', process.env.hashingSecret) // encrypted password
      .update(password).digest('hex') // passing the password

    await createUser({ name, password: ePassword, email, phone, role })

    res.cookie('email', email, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 8640000000)
    })
    res.json({
      message: 'SUCCESS User Has Created Successfully'
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
    console.log('hi before sending request')
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
    res.status(500).json({ message: error.message })
  }
})

// get CurrentUsers

routs.get('/CurrentUser', async (req, res) => {
  const { email } = req.cookies

  try {
    const curUser = await findUserByEmail(email)

    if (!curUser) {
      console.log('something wrong')
      res.status(401).end()
    } else {
      res.json({
        user: curUser

      })
    }

    // get the currentUser from the cookies
  } catch (e) {
    res.status(500).json({
      error: e.message
    })
    console.log(e)
  }
})

// logout
routs.get('/logout', async (req, res) => {
  console.log('hi from logout function')

  // get cookies
  const cookie = req.cookies
  console.log('cookies', cookie)

  try {
    // clear the email address  and responds with message
    res.clearCookie('email', cookie)

    res.redirect('/')

    // get the currentUser from the cookies
  } catch (e) {
    res.status(500).json({
      error: e.message
    })
    console.log(e)
  }
})
// logout

// get Players
routs.get('/players', async (req, res) => {
  try {
    const { role } = req.query
    console.log('role', role)
    const name = await getUsers(role)

    if (!name) {
      console.log('Something went wrong ')
      res.status(500).end()
    } else {
      // if user role is there get the last of the user name
      console.log('Success' + name)
      res.json({

        Users: name
      })
    }
  } catch (error) {
    console.log('Error')
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})
// send team request
routs.post('/createTeam', async (req, res) => {
  try {
    const { orgnizerId, start, end, listOfPlayer } = req.body

    await createTeam({ orgnizerId, start, end, listOfPlayer })

    res.json({
      message: 'SUCCESS Team Has Created Successfully'

    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})

routs.get('/getMyCenters', async (req, res) => {
  try {
    const centers = await getMyCenters(req.cookies.email)
    res.json({ centers })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})
routs.post('/createCenter', async (req, res) => {
  try {
    const { name, address, phone } = req.body

    // get the location
    const locations = await getLocation(address)
    console.log(locations)
    if (locations.length === 0) {
      throw new Error('No location found')
    }

    await createCenter({
      name,
      address,
      phoneNumber: phone,
      ownerEmail: req.cookies.email,
      location: {
        type: 'Point',
        coordinates: [locations[0].longitude, locations[0].latitude]
      }
    })
    res.json({ message: 'SUCCESS' })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

// get userName from userCoolcation

routs.post('/centerPhtos', filemiddelware.single('file'), async (req, res)=>{

  try{
    const file = req.file
// save file to upload file function 

 const uri = await uploadFile(file)
 if (!uri){
   res.status(5000)
 }
 res.json({uri:uri})

 // 

    
  }catch(error){

  }



  // get center
  routs.get('/getCenter', async (req, res) => {
    try {
      const { id } = req.query
      console.log('role', id)
      const centerID = await getCenter(id)
  
      if (!centerID) {
        console.log('Something went wrong ')
        res.status(500).end()
      } else {
        // if user role is there get the last of the user name
        console.log('Success' + centerID)
        res.json({
          center:centerID
  
          
        })
        
      }
    } catch (error) {
      console.log('Error')
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
  })












})

module.exports = routs
