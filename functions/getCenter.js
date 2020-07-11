const center = require('../model/centers')

try{
    const getCenterByID = async (id) =>{
     
        const getCenter = await center.findOne({id})
        
        return getCenter
        
         }

}catch(err){
    console.log(err)
    
}
