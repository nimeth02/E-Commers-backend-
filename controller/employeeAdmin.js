const EmployeeAdmin = require("../models/employeeAdmin");
const { resErr } = require("./ErrorHandle/res.error");
const { resSucc_data } = require("./successHandle.js/res.success");

exports.employeeOpens=async(req,res,next,_id,today)=>{
    const employee=await EmployeeAdmin.findOne({adminId:_id})
      if(employee){
          console.log('already created');
        employee.atendence.push({ Date:today,
            opensAt:new Date,
      
           
        })
            //console.log(employee,'day');
            await employee.save((err,data)=>{
               if (err) resErr(res, 400, err)
               if(data){
                  // console.log(data);
                next()
               }        
           })
        
      }
      else{
        console.log('newly created');
        const employeeadmin=EmployeeAdmin({
            adminId:_id,
            atendence:{
              Date:today,
              opensAt:new Date,
            }
          })
          console.log(employeeadmin,'day');
         await employeeadmin.save((err,data)=>{
            if (err) resErr(res, 400, err);
            if(data){
             next()
            }        
        })
      }
       

   
}

exports.employeeClose=async(req,res,next,_id,today)=>{
    try {
        const employee=await EmployeeAdmin.findOne({adminId:_id})
        if(employee){
           // console.log('already created');
            //console.log(employee.atendence.length,employee.atendence[employee.atendence.length -1]); 
            employee.atendence[employee.atendence.length -1].closedAt=new Date

          employee.save((err,data)=>{
              if (err) resErr(res, 400, err);
                 if(data){
                    // console.log(data);
                  next()
                 }  
          })
          
        }
        else{
          resErr(res, 400, "user not found error in closed");
           
           
        }
         
    } catch (error) {
        resErr(res, 400, error);
    }
  

   
}

exports.employee_AtendenceGet=async(req,res)=>{
    console.log('employee atendence');
    try {
        const {admin}=req.body
        if(admin == "All"){
            await EmployeeAdmin.findOne({adminId:req.user._id}).exec((err,data)=>{
                if(err)resErr(res,400,err)
                if(data) resSucc_data(res,200,data)
            })
        }
        else{
            console.log('jl');
            await EmployeeAdmin.findOne({adminId:admin}).exec((err,data)=>{
                if(err)resErr(res,400,err)
                if(data)console.log(data); resSucc_data(res,200,data)
            })
        }
      
    } catch (error) {
        resErr(res, 400, error);
    }
  

   
}