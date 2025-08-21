const express=require('express');
const path=require('path')
const router=express.Router();

console.log('rout direc sub')

router.get('/',(req,res)=>{
    console.log('router req ',req.url)
    res.sendFile(path.join(__dirname,"..",'Index','subdir','index.html'))
})
router.get('/test.html',(req,res)=>{

    console.log('router req ',req.url)
    res.sendFile(path.join(__dirname,"..",'Index','subdir','test.html'))
})

module.exports=router;

