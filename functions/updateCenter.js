const Center = require('../model/centers')

// save the url 
const updateCenter = async (id, center)=>{

    try{
        const res = await Center.updateOne({ id }, { $set : center })

        return res

    }catch(err){

    }
    // save the update 
   

}

module.exports = updateCenter