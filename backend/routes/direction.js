const express=require('express')
const dR=express.Router()
const axios=require('axios')
const directions=require('../schemas/directions')

// const dir=async()=>{
// const d=[]
// const response=await axios.get(`http://ctabustracker.com/bustime/api/v2/getdirections?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json`)
// const newResponse=response['data']['bustime-response']['directions']
// newResponse.map((item)=>{
//     d.push(item)
// })
// const collections=directions.insertMany(d)
// }
// dir()

dR.get('/directions',async(req,res)=>{
    const response=await directions.find()
    res.json(response)
})

dR.get('/directions/:id',async(req,res)=>{
    try{
    const response=await directions.findById({_id:req.params.id})
    res.send(response)
    }catch(e){
        res.send(e)
    }
})

dR.post('/directions',async(req,res)=>{
    const response=new directions(req.body)
    response.save()
    res.json(response)
})

dR.patch('/directions/:id',async(req,res)=>{
    try{
    const response=await directions.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    response.save()
    res.json(response)
    }catch(e){
        res.send(e)
    }
})

dR.delete('/directions/:id',async(req,res)=>{
    try{
        const data=await directions.findByIdAndDelete({_id:req.params.id})
        res.send("Deleted!")
    }catch(e){
        res.json(e)
    }
})

module.exports=dR