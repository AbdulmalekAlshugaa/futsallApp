// update user 
const User = require('../model/users')

const updateUser = async(id, user) =>{
    try{
        const res = await User.updateOne({id}, {$set: user})

        return res
    }catch(err){
        console.log(err)
        throw err

    }
}

module.exports = updateUser