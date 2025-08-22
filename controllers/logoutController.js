
const jwt=require('jsonwebtoken')
const path=require('path')
const fsPromise=require('fs').promises
require('dotenv').config()


const userDB={
    users:require('../model/users.json'),
    setUser:function(data){this.users=data}
}

const handleLogout=async (req,res)=>{
    const cookies=req.cookies
    console.log(cookies)
    if(!cookies?.jwt) return res.sendStatus(401)

        const refreshToken=cookies.jwt;
        
        const userMatch=userDB.users.find(person=>person.refreshToken===refreshToken)
        if(!userMatch){
            res.clearCookie('jwt',{httpOnly:true,sameSite:"none",secure:true});
            return res.sendStatus(204)
        }

        const otherUser=userDB.users.filter(person=>person.refreshToken!==userMatch.refreshToken);
        const currentUser={...userMatch,refreshToken:""}
        userDB.setUser([...otherUser,currentUser])

        console.log(userDB.users)

        await fsPromise.writeFile(
            path.join(__dirname,"..","model","users.json"),
            JSON.stringify(userDB.users,null,2)
        )

        res.clearCookie('jwt',{httpOnly:true,sameSite:"none",secure:true});
        // res.json({"message":`user ${userMatch.username} is successfully logout`})
            res.sendStatus(204);
     
    
}

module.exports={handleLogout}