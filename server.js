// const path=require('path');
// const express=require('express')
// const cookieParser=require('cookie-parser')
// const app=express();
// const verifyJWT=require("./middileware/verifyJWT")
// require('dotenv').config()
// const PORT=process.env.PORT || 3500

// const {logger}=require('./middileware/logE')
// const session = require('express-session');

// const cors=require('cors')



// app.use(logger)

// app.use(cors())

// app.use(express.urlencoded({extended:false}))

// app.use(express.json())

// app.use(cookieParser());

// app.use(session({
//     secret: process.env.SESSION_SECRET, 
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true }
// }));

// app.use(express.static(path.join(__dirname,'public')))


// app.use('/subdir',require('./router/subdir'))
// app.use('/',require('./router/root'))
// app.use("/register",require('./router/register'))
// app.use("/auth",require('./router/auth'))
// app.use("/refresh",require('./router/refresh'))
// app.use("/logout",require('./router/logout'))

// app.use(verifyJWT)

// app.use('/employee',require('./router/api/employees'));

// app.get('/chain.html',(req,res,next)=>{
//     console.log('attemp to log');
//     next();
// },(req,res)=>{
//     console.log('im never printed')
//     res.send('Ok im being sended')
// })

// // let one=(req,res,next)=>{
// //     console.log('one')
// //     next()
// // }
// // let two=(req,res,next)=>{
// //     console.log('two')
// //     next()
// // }
// // let three=(req,res)=>{
// //     console.log('three')
// //     res.send('Completed')

// // }

// // app.use('/chain.html',[one,two,three])

// app.all(/.*$/,(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname,'Index','404html.html'))
// })


// app.listen(PORT,()=>{
//     console.log(`listening on ${PORT}`)
// })





const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const session = require('express-session'); 

const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'your_super_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));


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


app.get('/home', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/login');
    });
});


app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});


app.all(/.*$/, (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});