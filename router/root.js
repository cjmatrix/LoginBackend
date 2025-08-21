const express=require('express')
const router=express.Router();
const path=require('path')

console.log('route direct root')

router.get(['/','/index.html','/index'],(req,res)=>{
  
    res.sendFile(path.join(__dirname,"..",'Index','index.html'))
})


router.get(['/mikey','/mikey.html'],(req,res)=>{
    console.log('redirecting')
    res.redirect('/index.html')
})


module.exports=router;