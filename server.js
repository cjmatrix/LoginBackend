const path=require('path');
const express=require('express')
const cookieParser=require('cookie-parser')
const app=express();
const verifyJWT=require("./middileware/verifyJWT")

const PORT=process.env.PORT || 3500

const {logger}=require('./middileware/logE')

const cors=require('cors')



app.use(logger)

app.use(cors())

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')))


app.use('/subdir',require('./router/subdir'))
app.use('/',require('./router/root'))
app.use("/register",require('./router/register'))
app.use("/auth",require('./router/auth'))
app.use("/refresh",require('./router/refresh'))
app.use("/logout",require('./router/logout'))

app.use(verifyJWT)

app.use('/employee',require('./router/api/employees'));

app.get('/chain.html',(req,res,next)=>{
    console.log('attemp to log');
    next();
},(req,res)=>{
    console.log('im never printed')
    res.send('Ok im being sended')
})

// let one=(req,res,next)=>{
//     console.log('one')
//     next()
// }
// let two=(req,res,next)=>{
//     console.log('two')
//     next()
// }
// let three=(req,res)=>{
//     console.log('three')
//     res.send('Completed')

// }

// app.use('/chain.html',[one,two,three])

app.all(/.*$/,(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'Index','404html.html'))
})


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})