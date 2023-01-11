const express=require('express')
const sR=express.Router()
const axios=require('axios')

// const st=async()=>{
// const s=[]
// const key='ujAhaYu9dy6TAF2VgMLWK5nnV'
// const response=await axios.get(`https://ctabustracker.com/bustime/api/v2/getstops?key=${key}&rt=7&dir=Eastbound&format=json`)
// const newResponse=response['data']['bustime-response']['stops']
// newResponse.map((item)=>{
// s.push(item)
// })
// const collections=stopsS.insertMany(s)

// }
// st()

const stopsS=require('../schemas/stops')
sR.get('/stops',async(req,res)=>{
    const response=await stopsS.find()
    res.json(response)
})

sR.get('/stops/:id',async(req,res)=>{
    try{
        const response=await stopsS.findById({_id:req.params.id})
        res.send(response)
    }catch(e){
        res.send(e)
    }
})

sR.post('/stops',async(req,res)=>{
    const response=new stopsS(req.body)
    response.save()
    res.send(response)
})

sR.patch('/stops/:id',async(req,res)=>{
    try{
    const response=await stopsS.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    response.save()
    res.send(response)
    }catch(e){
        res.send(e)
    }
})

sR.delete('/stops/:id',async(req,res)=>{
    try{
    await stopsS.findByIdAndDelete({_id:req.params.id})
    res.send("Deleted!")
    }catch(e){
        res.send(e)
    }
})



module.exports=sR