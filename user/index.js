const routs = require('express').Router()
const crypto = require('crypto')
const createUser = require('../functions/createUser')



routs.post('/createUser', async (req, res) =>{
// send json 
try{
    const {name , email , password,phone, role } = req.body

   const ePassword =  crypto.createHmac('sha256', process.env.hashingSecret) // encrypt password 
    .update(password).digest('hex') // passing the password

   await createUser({name,password:ePassword,email,phone,role})

   res.json({
       message:'SUCCESS'
    
   })

   // 
  
}catch(error){
    console.log(error)
    res.status(500).json({
        error:error.message
    })

}


})

module.exports = routs
