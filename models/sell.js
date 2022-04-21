const mongoose = require("mongoose");

const sellschema = new mongoose.Schema(
  {
    
    totalprice : {
      type: Number,
    },
    adminId: {
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
      
    },
    sellreport: [
      {
        quantity:{type:Number},
        product_Id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
           
         }
      },
    ],
  },
  { collection: "sell",timestamps:true }
);

module.exports = mongoose.model("Sell", sellschema);