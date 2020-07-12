// get court model 
const Court = require('../model/court')

// create function to store the court 
const CreateCourt = async (courtobj)=>{
    try {
        const addCourt = Court(courtobj)

        await addCourt.save()
        return addCourt

    }catch(err){
        console.log(er)
    }
} 

module.exports = CreateCourt