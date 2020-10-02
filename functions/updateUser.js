// update user 
const User = require('../model/users')

const updateUser = async(email, user) =>{
    try{
        const res = await User.updateOne({ email }, {$set: user})

        return res
    }catch(err){
        console.log(err)
        throw err

    }
}

module.exports = updateUser