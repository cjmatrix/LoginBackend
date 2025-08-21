

const data={};

data.employees=require('../model/datas.json')

const getAllEmployee=(req,res)=>{
            res.json(data.employees)
        }


const createEmployee=(req,res)=>{
            let newE={
                "id":data.employees.length?data.employees[data.employees.length-1].id +1:1,
                "firstname":req.body.firstname,
                "lastname":req.body.lastname
            }

            data.employees.push(newE)
            res.json(data.employees)
        }


const updateEmployee=(req,res)=>{
            let employee=data.employees.find(emp=>emp.id===parseInt(req.body.id))

            if(!employee){
                res.status(400).json({"error":`id ${req.body.id} not found`})
        
            }
            employee.firstname=req.body.firstname || employee.firstname
            employee.lastname=req.body.lastname || employee.lastname
        
            res.json(data.employees)
        }

const deleteEmployee=(req,res)=>{
            const idToDelete=parseInt(req.body.id)

            data.employees=data.employees.filter(emp=>emp.id!==idToDelete)

            res.json(data.employees)
        }

        

        module.exports={
            getAllEmployee,createEmployee,updateEmployee,deleteEmployee
        }