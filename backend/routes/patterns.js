const express=require('express')
const axios=require('axios')
const pR=express.Router()
const patterns=require('../schemas/patterns')

// const patt=async()=>{
// const p=[]
// const response=await axios.get(`https://ctabustracker.com/bustime/api/v2/getpatterns?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&pid=954&format=json`)
// const newResponse=response['data']['bustime-response']['ptr']
// newResponse.map((item)=>{
//     p.push(item)
// })
// const collections=patterns.insertMany(p)
// }
// patt()

pR.get('/patterns',async(req,res)=>{
    const response=await patterns.find()
    res.json(response)
})

pR.get('/patterns/:id',async(req,res)=>{
    try{
        const response=await patterns.findById({_id:req.params.id})
        res.send(response)
 
    }catch(e){
        res.send(e)
    }
})

pR.post('/patterns',async(req,res)=>{
    const response=new patterns(req.body)
    response.save()

    res.send(response)
})

pR.patch('/patterns/:id',async(req,res)=>{
    try{
    const response=await patterns.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    response.save()

    res.send(response)
    }catch(e){
        res.send(e)
    }
})

pR.delete('/patterns/:id',async(req,res)=>{
    try{
    await patterns.findByIdAndDelete({_id:req.params.id})

    res.send("Deleted!")
    }catch(e){
        res.send(e)
    }
})

module.exports=pR

