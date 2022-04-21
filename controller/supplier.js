const { findOne } = require("../models/product");
const Product = require("../models/product");
const { resErr } = require("./ErrorHandle/res.error");
const { resSucc_data } = require("./successHandle.js/res.success");
const logger =require('../config/logger');
const Supplier = require("../models/supplier");

exports.createsupplier=async(req,res)=>{
    console.log('add supplier');
    const {name,email,mobilenumber}=req.body
    try {
      const supplier=new Supplier({
          name,email,mobilenumber
      })
      console.log(supplier);
      await supplier.save((err,data)=>{
          if(err) resErr(res,400,err)
          if(data)resSucc_data(res,200,data) 
        })
    } catch (error) {
        resErr(res,400,error)
    }
}
exports.get_all_suppliers=async(req,res)=>{
    console.log('get all supplier');
    try {
       await Supplier.find().exec((err,data)=>{
        if(err) resErr(res,400,err)
        if(data)resSucc_data(res,200,data) 
       })
    } catch (error) {
        resErr(res,400,error)
    }
}


exports.delete_supplier=async(req,res)=>{
    console.log(' delete_supplier ');
    
    try {
        
      const id=req.params.id
      console.log(id,'l');
     await Supplier.findOneAndDelete({_id:id}).exec((err,data)=>{
        if(err) resErr(res,400,err)
        if(data)console.log(data); resSucc_data(res,200,data)
      })

    } catch (error) {
        resErr(res,400,error)
    }
}
 exports.edit_supplier=(req,res)=>{
    console.log(' edit_supplier ');
    try {
      const id=req.params.id
      const{name,email,mobilenumber}=req.body
      Supplier.findOneAndUpdate({_id:id},{name:name,email:email,mobilenumber:mobilenumber},{new:true}).exec((err,data)=>{
        if(err) resErr(res,400,err)
        if(data)console.log(data); resSucc_data(res,200,data)
      })

    } catch (error) {
        resErr(res,400,error)
    }
}