const path=require('path');
const express=require('express')
const cookieParser=require('cookie-parser')
const app=express();
const verifyJWT=require("./middileware/verifyJWT")
require('dotenv').config()
const PORT=process.env.PORT || 3500
const jwt=require('jsonwebtoken')
const {logger}=require('./middileware/logE')
const session = require('express-session');

const cors=require('cors')



app.use(logger)

app.use(cors())

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));



app.get('/login.html', (req, res) => {
   
    const token = req.cookies.jwt;
    if (token) {

        jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
            
                    res.sendFile(path.join(__dirname, 'public', 'login.html'));
                } else {
           
                    res.redirect('/employee.html');
                }
            }
        );
    } else {
        
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});


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



const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
};




app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.use('/login', require('./router/login')); 




app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/login');
    });
});



app.all(/.*$/,(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'Index','404html.html'))
})


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})




