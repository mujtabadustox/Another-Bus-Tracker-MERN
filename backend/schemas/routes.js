const mongoose=require('mongoose')
const routeS=new mongoose.Schema({
    rt:String,
    rtnm:String,
    rtclr:String,
    rtdd:String
})

const routesS=mongoose.model('route',routeS)

module.exports=routesS