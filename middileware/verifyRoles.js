const verifyRoles=function(...allowedRoles){

    return (req,res,next)=>{
        const rolesArray=[...allowedRoles]
        console.log(rolesArray)
        console.log(req.roles)
        if(!req?.roles){
           return res.sendStatus(401)
        }

        const result=req.roles.map(role=>rolesArray.includes(role)).find(value=>value===true)

        if(!result) return res.sendStatus(401)
        
        next();

    }
}

module.exports=verifyRoles