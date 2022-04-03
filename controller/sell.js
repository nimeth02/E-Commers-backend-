const Sell = require("../models/sell");
const { resErr } = require("./ErrorHandle/res.error");
const { resSucc_data } = require("./successHandle.js/res.success");

exports.add_sell=async(req,res)=>{
    console.log('add_sell');
    try {
        const {sellreport,totalprice}=req.body
        const sell=new Sell({
            adminId:req.user._id,
            totalprice,
            sellreport
        })
       // console.log(sell);
       await sell.save((err,sell)=>{
           if(err) resErr(res,400,err)
           if(sell){
               resSucc_data(res,200,sell)
           }
       })
    } catch (error) {
        resErr(res,400,error)
    }
}

exports.get_all_sold=async(req,res)=>{
    console.log('get_all_sold');
    try {
        await Sell.find().populate('sellreport.productId','_id name price').populate('adminId','_id email').exec((err,sold)=>{
            if(err) resErr(res,400,err)
            if(sold){
                resSucc_data(res,200,sold)
            }
        })
    } catch (error) {
        resErr(res,400,error)
    }
}