

const path=require('path');
const express=require('express')
const router=express.Router();
const verifyRoles=require("../../middileware/verifyRoles")
const ROLES_LIST=require("../../config/ROLES_LIST")
const employeeController=require('../../controllers/employeeControllers');
// const verifyJWT = require('../../middileware/verifyJWT');

router.route('/')
        .get(employeeController.getAllEmployee)
        .post(verifyRoles(ROLES_LIST.Admin),employeeController.createEmployee)
        .put(employeeController.updateEmployee)
        .delete(employeeController.deleteEmployee)

module.exports=router;





//without mvc

// const path=require('path');
// const express=require('express')
// const router=express.Router();
// const data={};

// data.employees=require('../../data/datas.json')

// router.route('/')
//         .get((req,res)=>{
//             res.json(data.employees)
//         })
//         .post((req,res)=>{
//             let newE={
//                 "firstname":req.body.firstname,
//                 "lastname":req.body.lastname
//             }

//             data.employees.push(newE)
//             res.json(data.employees)
//         })
//         .put((req,res)=>{
//             let employee=data.employees.find(emp=>emp.id===parseInt(req.body.id))

//             if(!employee){
//                 res.status(400).json({"error":`id ${req.body.id} not found`})
        
//             }
//             employee.firstname=req.body.firstname || employee.firstname
//             employee.lastname=req.body.lastname || employee.lastname
        
//             res.json(data.employees)
//         })
//         .delete((req,res)=>{
//             const idToDelete=parseInt(req.body.id)

//             data.employees=data.employees.filter(emp=>emp.id!==idToDelete)

//             res.json(data.employees)
//         })

// module.exports=router;

// const express=require('express')
// const app=express();
// const PORT=3500;

// const employees=[
//     { id: 1, name: 'Suresh', role: 'Developer' },
//     { id: 2, name: 'Priya', role: 'Project Manager' },
//     { id: 3, name: 'Amit', role: 'Designer' }
// ];


// app.get('/api/employees',(req,res)=>{
//     res.json(employees)
// })

// app.get('/api/employees/:id',(req,res)=>{
//     const id=parseInt(req.params.id)

//     let employee=employees.find(emp=>emp.id==id)
//     if(employee){
//         res.json(employee)
//     }
//     else{
//         res.json({error:`employee with ${id} is not found`})
//     }



// })
// app.listen(PORT,()=>{
//     console.log(`server listening on port ${PORT}`)
// })



// console.log(Date.now())