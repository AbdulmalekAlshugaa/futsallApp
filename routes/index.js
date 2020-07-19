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
const getCenterbyid = require('../functions/getCenter')
const createCourt = require('../functions/createCourt')
const getCourtCenter = require('../functions/getCourtCenter')
const getPlayersPostion = require('../functions/findAllPlayers')
const getMyTeam = require('../functions/getMyTeam')
const createCompetition = require('../functions/createCompe')
const updateCenter = require('../functions/updateCenter')
const subscripToComp = require('../functions/subscripToCompetition')

//const updatePhoto = require('')



routs.post('/createUser', async (req, res) => {
// send json
  try {
    const { name, email, password, phone, role,postion } = req.body

    const ePassword = crypto.createHmac('sha256', process.env.hashingSecret) // encrypted password
      .update(password).digest('hex') // passing the password

    await createUser({ name, password: ePassword, email, phone, role,postion })

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

routs.get('/Playerpostion', async (req, res) => {
  try {
    const { position } = req.query
    console.log('postion', position)
    const players = await getPlayersPostion(position)

    if (!players) {
      console.log('Something went wrong ')
      res.status(500).end()
    } else {
      // if user role is there get the last of the user name
      console.log('Success' + players)
      res.json({

        players: players
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
// create team 
routs.post('/createTeam', async (req, res) => {
  console.log("Working")
  try {
    const email = req.cookies.email
    console.log(email)
    
    const {id, captainEmail, from, to, date,status,listOfPlayers} = req.body

    await createTeam({ id, captainEmail:email, from, to, date, status,listOfPlayers })

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

routs.get('/getMyTeam', async (req, res) => {
  const { captainEmail } = req.cookies
  const {Email} = req.query
  console.log("Email is ",Email)

  try {
    const team = await getMyTeam(captainEmail, Email)

    if (!team) {
      console.log('something wrong')
      res.status(401).end()
    } else {
      res.json({
        team: team

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
// create court
routs.post('/createCourt', async (req, res) => {
  console.log('test')
  try {
    const { name, centerId, capacity, price } = req.body

    await createCourt({ name, centerId, capacity, price })

    res.json({

      message: 'SUCCESS court Has Created Successfully'



    })
  }catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})
routs.post('/nearCenters', async (req, res) => {
  try {
    const address = req.body.address
    const max = req.body.max
    const locations = await getLocation(address)
    if (locations.length === 0) {
      throw new Error('No location found')
    }

    const centers = await findNearCenter({ longitude: locations[0].longitude, latitude: locations[0].latitude, max })
    const centerWithdis = centers.map(c => {
      const distanceKM = distance(c.location.coordinates[1], c.location.coordinates[0], locations[0].latitude, locations[0].longitude)
      return { ...c, distanceKM }
    })
    res.json({
      centerWithdis
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})
routs.post('/centerPhotoes', filemiddelware.single('file'), async (req, res) => {
  console.log('Test')
  try {
    const file = req.file
    // save file to upload file function

    const uri = await uploadFile(file)
    console.log('Url is ', uri)
    console.log(uri)
    if (!uri) {
      res.status(5000)
    }
    res.json({ uri: uri })

    //
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }

  // get center
})
routs.post('/editCenter', async (req, res) => {
  try {
    const { id, address, start, end } = req.body
    const center = await getCenterbyid(id)
    let location
    if (center.address !== address) {
      const locations = await getLocation(address)
      if (locations.length === 0) {
        throw new Error('No location found')
      }
      location = {
        type: 'Point',
        coordinates: [locations[0].longitude, locations[0].latitude]
      }
    } else {
      location = center.location
    }

    await updateCenter(id, {
      location,
      address,
      workingHours: {
        from: start,
        to: end
      }
    })

    res.json({ message: 'Success' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
})
// get center by id
routs.get('/getCenter', async (req, res) => {
  try {
    const { id } = req.query
    console.log('id is', id)
    const centers = await getCenterbyid(id)
    const courts = await getCourtCenter(id)
    console.log('courts', courts)
    res.json({ centers, courts })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

routs.get('/getCourts', async (req, res) =>{
  // pass the centired id 
  console.log("Test counter")
  try {
    const {centerId} = req.query
    console.log(centerId)
   
    const coutrs = await getCourts(centerId)
    res.json({coutrs})   
  }catch(err){
    console.log(err)
    throw err
  }
 
  

})

routs.post('/createCompetition', async (req, res)=>{

  try{
    // get centired id 
    const {centerId,name,from, to, time, decription,prize} = req.body

    await createCompetition({ centerId,name,from,to,time,decription,prize})

    res.json({
      createCompetition:"Created Successfully"
    })
    
  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }
 


})
routs.post('/subscripToComp', async (req, res) =>{
  try{
    const email = req.cookies.email
    const {id, competitionId, captainEmail,name,listofmyPlayers,decription} = req.body

    await subscripToComp({ id,competitionId, captainEmail:email,name,listofmyPlayers,decription})

    res.json({
      subscrip:"Team has added to the list"
    })
  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }

} )




module.exports = routs
