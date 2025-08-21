const path=require('path')

const bcrypt=require('bcrypt');

const fsPromise=require('fs').promises

const userDB={
    users:require('../model/users.json'),
    setUser:function(data){this.users=data}
}

const handleNewUser=async (req,res)=>{
    console.log("handlenew user running");

    const {user,pwd}=req.body;

    if(!user || !pwd){
        res.status(400).json({"message":"password or username is required"})//request cant proceed due to apparent client error
    }

    const duplicate=userDB.users.find(person=>person.username===user)

    if(duplicate)
    {
        return res.sendStatus(409)//conflict
    }
    try{
        const hashPWD= await bcrypt.hash(pwd,10);


        const newUser={
            "username":user,
            "roles":{"User":2001},
            "password":hashPWD
        }
     
     
        userDB.setUser([...userDB.users,newUser])

        await fsPromise.writeFile(path.join(__dirname,"..","model","users.json"),JSON.stringify(userDB.users))

           console.log('new user prinitng')
           console.log(userDB.users);
           
        res.status(201).json({"message":`new user ${user} created`})

    }
    catch(err){
        res.status(500).json({"error":"server site error"})
     
    }

}


module.exports={handleNewUser}



