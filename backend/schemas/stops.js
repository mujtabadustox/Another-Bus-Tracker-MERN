const mongoose=require('mongoose')

const stopS=new mongoose.Schema({
    stpid:String,
    stpnm:String,
    lat: Number,
    lon: Number
})

const stopsS=mongoose.model('stop',stopS)
module.exports=stopsS
