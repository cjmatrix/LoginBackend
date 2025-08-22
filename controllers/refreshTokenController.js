
const jwt=require('jsonwebtoken');
require('dotenv').config();
const path=require('path');



const userDB={
    users:require('../model/users.json'),
    setUser:function(data){this.users=data}
}

const handleRefreshToken=async (req,res)=>{
     const cookies=req.cookies
     console.log(cookies);

    if(!cookies?.jwt){
       return res.sendStatus(401)
    }
    const refreshToken=cookies.jwt;

    const userMatch=userDB.users.find(person=>person.refreshToken===refreshToken);
       console.log(userMatch)

    if(!userMatch){
            console.log('no user')
        return res.sendStatus(403)
    
    }
    const roles=Object.values(userMatch.roles)

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err|| userMatch.username!==decoded.username){
                return res.status(403).json({"message":"error in refresh token verify"})
            }

            const accessToken=jwt.sign({"username":decoded.username,"roles":roles},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            )
            console.log("refresh acess token created");
            res.json({accessToken})
        }
    )
}

module.exports={handleRefreshToken}

