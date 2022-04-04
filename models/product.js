const mongoose = require("mongoose");

const productschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      unique:true,
    },
    productId:{
      type: String,
      required:true,
      unique:true,
    },
    quantity: {
      type: Number,
    },
    price : {
      type: Number,
    },
    description: { 
        type: String 
    },
    categorytId: {
       type:mongoose.Schema.Types.ObjectId,
       ref:'Category'
      
    },
    productImage: [
      {
        img: { type: String },
      },
    ],
  },
  { collection: "product",timestamps:true }
);

module.exports = mongoose.model("Product", productschema);
