const mongoose = require("mongoose");

const employeeAdminschema = new mongoose.Schema(
  {
    
    adminId: {
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       unique:true
      
    },
    atendence: [
      {
        Date:{
            type:String,
            required:true,
            
        },
        opensAt:{
            type:Date
        },
        closedAt:{
            type:Date
        }
      },
    ],
  },{collection:'employeeAdmin'}
);

module.exports = mongoose.model("EmployeeAdmin", employeeAdminschema);