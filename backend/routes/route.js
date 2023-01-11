const express=require('express')
const rR=express.Router()
const axios=require('axios')

// const rou=async()=>{
// const r=[]
// const key='ujAhaYu9dy6TAF2VgMLWK5nnV'
// const response=await axios.get(`http://ctabustracker.com/bustime/api/v2/getroutes?key=${key}&format=json`)
// const newResponse=response['data']['bustime-response']['routes']
// newResponse.map((item)=>{
// r.push(item)
// })
// const collections=routesS.insertMany(r)
// }
// rou()

const routesS=require('../schemas/routes')

rR.get('/routes',async(req,res)=>{
    const response=await routesS.find()
    res.json(response)
})

rR.get('/routes/:id',async(req,res)=>{
    try{
        const response=await routesS.findById({_id:req.params.id})
        res.send(response)
    }catch(e){
        res.send(e)
    }
})

rR.post('/routes',async(req,res)=>{
    const response=new routesS(req.body)
    response.save()
    res.send(response)
})

rR.patch('/routes/:id',async(req,res)=>{
    try{
    const response=await routesS.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    response.save()
    res.send(response)
    }catch(e){
        res.send(e)
    }
})

rR.delete('/routes/:id',async(req,res)=>{
    try{
    await routesS.findByIdAndDelete({_id:req.params.id})
    res.send("Deleted!")
    }catch(e){
        res.send(e)
    }
})

module.exports=rR