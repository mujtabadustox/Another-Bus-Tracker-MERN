const mongoose=require('mongoose')

const pattern=new mongoose.Schema({
    pid:Number,
    ln:Number,
    rtdir:String,
    pt:Array
})

const patterns=mongoose.model('pattern',pattern)

module.exports=patterns