
const fs=require('fs');
const fsPromise=require('fs').promises;

const path=require('path');
const {format}=require('date-fns')
const {v4:uuid}=require('uuid')


let logEvent=async (msg,logText)=>{

     let logItem=`${format(new Date,'hhhh mm ss')}\t\t${uuid()}\t\t${msg}\n`

    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromise.mkdir(path.join(__dirname,'..','logs'))
        }


        await fsPromise.appendFile(path.join(__dirname,'..','logs',logText),logItem)
    
    }
    catch(err){
     
        console.log(err.message)
    }
  
}

let logger= (req,res,next)=>{
    console.log(`${req.method} ${req.path}`)
    logEvent(`${req.method} ${req.path} ${req.headers.origin}`,'logdetail.txt')
    next()
}

module.exports={logEvent,logger};
//sfewfdd