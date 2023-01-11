const mongoose=require('mongoose')
const direction=new mongoose.Schema({
    dir:String
})

const directions=mongoose.model('direction',direction)

module.exports=directions