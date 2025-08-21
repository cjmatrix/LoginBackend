const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
require('dotenv').config();
const path=require('path');
const fsPromise=require('fs').promises


const userDB={
    user:require('../model/users.json'),
    setUser:function(data){this.user=data}
}

const handleUser=async (req,res)=>{

    const {user,pwd}=req.body;

    if(!user || !pwd){
       return res.status(400).json({"message":"username and password required"});
    }

    const userMatch=userDB.user.find(person=>person.username===user);
       console.log(userMatch)

    if(!userMatch){
            console.log('no user')
        return res.sendStatus(401)
    
    }

 
    const match= await bcrypt.compare(pwd,userMatch.password);
    if(match){
        const roles=Object.entries(userMatch.roles)

        const accessToken=jwt.sign({
            "username":userMatch.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
         )

         const refreshToken=jwt.sign({
            "username":userMatch.username,
            "roles":roles
         },

         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn:'1d'}

        )


        console.log("Tokens are created")
        const otherUsers=userDB.user.filter(person=>person.username!==userMatch.username);
        const currentUser={...userMatch,refreshToken};
        userDB.setUser([...otherUsers,currentUser]);
        console.log(userDB.user);
        await fsPromise.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.user,null,2))
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:"none",secure:true,maxAge:24*60*60*1000})

        res.json({accessToken})
    

    }else
     return res.status(400).json({"message":"password is incorrect"});


}

module.exports={handleUser}

