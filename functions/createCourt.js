// get court model 
const  { v4: uuidv4 } = require('uuid')
const Court = require('../model/court')



// create function to store the court 
const CreateCourt = async (courtobj)=>{
    try {
        courtobj.id = uuidv4()
        const addCourt = new Court(courtobj)

        await addCourt.save()
        return addCourt

    }catch(err){
        console.log(err)
    }
} 

module.exports = CreateCourt