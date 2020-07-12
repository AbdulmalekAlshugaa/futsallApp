const court = require('../model/court')
const court = require('../model/court')
const { find } = require('../model/court')
// sned cenrired id 

try{
    const findCourtWithinTheCenter = await find(centerId)
}catch(err){
    console.log(err)
    throw err
}


