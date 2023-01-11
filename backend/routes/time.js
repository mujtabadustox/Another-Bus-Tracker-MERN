const express=require('express')
const tR=express.Router()
const axios=require('axios')
tR.get('/gettime',async(req,res)=>{
    const response= await axios.get('https://www.ctabustracker.com/bustime/api/v2/gettime?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json')
    res.json(response['data']['bustime-response']['tm'])
})

module.exports=tR