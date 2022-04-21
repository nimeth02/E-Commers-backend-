const { findOne } = require("../models/product");
const Product = require("../models/product");
const { resErr } = require("./ErrorHandle/res.error");
const { resSucc_data } = require("./successHandle.js/res.success");
const logger = require("../config/logger");
const Category = require("../models/category");

exports.createproduct = (req, res) => {
  console.log("add product");
  try {
    const { name, quantity, price, description, select, productId } = req.body;
    // console.log(req.files);
    let productImage = [];
    if (req.files.length > 0) {
      productImage = req.files.map((file) => {
        console.log(file);
        return { img: file.filename };
      });
      console.log(productImage);
    }
    const product = new Product({
      name,
      productId,
      quantity,
      description,
      price,
      productImage,
      categorytId: select,
    });
    console.log(product);
    product.save((err, data) => {
      if (err) resErr(res, 400, err);
      if (data) {
        resSucc_data(res, 200, data);
      }
    });
  } catch (error) {
    resErr(res, 400, error);
  }
};
exports.getproduct = (req, res) => {
  console.log("get product", req.body.buttons_state);
  try {
    if (req.body.buttons_state.all == true) {
      Product.find()
        .select("_id name description price quantity productImage productId")
        .populate("categorytId", "_id name")
        .exec((err, data) => {
          if (err) resErr(res, 400, err);
          if (data) resSucc_data(res, 200, data);
        });
    } else if (req.body.buttons_state.filter == true) {
      filterproduct(req, res);
    }
  } catch (error) {
    resErr(res, 400, error);
  }
};
exports.editproduct = async (req, res) => {
  console.log("edit product");

  const { name, quantity, price, description, currentImage } = req.body;
  console.log(name, currentImage);
  try {
    let productImages = [];
    if (req.files.length > 0) {
      productImages = req.files.map((file) => {
        // console.log(file);
        return { img: file.filename };
      });
    }
    let pImg;
    const product = await Product.findOne({ _id: req.params.id }).populate(
      "categorytId",
      "_id name"
    );
    // .exec((err,data)=>{
    //     console.log(data.productImage);
    // })
    if (product) {
      //  console.log(product.productImage)
      pImg = product.productImage.filter((product) => {
        if (product) {
          const id = product._id.toString();
          console.log(id, "in pImg");
          if (currentImage && currentImage.includes(id)) {
            console.log("in include");
            //console.log(product)
            return product;
          } else {
          }
        }
      });
    }
    product.name = name;
    product.quantity = quantity;
    product.price = price;
    product.description = description;
    product.productImage = productImages;
    product.productImage = product.productImage.concat(pImg);
    console.log("pImg=", pImg, "productImages=", productImages, product);
    await product.save((err, data) => {
      if (err) resErr(res, 400, err);
      if (data) {
        // const {updatedAt,createdAt,...data}=pdata
        console.log(data);
        resSucc_data(res, 200, data);
      }
    });
  } catch (error) {
    resErr(res, 400, error);
  }
};
exports.deleteproduct = async (req, res) => {
  console.log("delete product");
  try {
    await Product.findOneAndDelete({ _id: req.params.id }).exec((err, data) => {
      if (err) resErr(res, 400, err);
      if (data) console.log(data);
      resSucc_data(res, 200, data);
    });
  } catch (error) {
    resErr(res, 400, error);
  }
};

const filterproduct = async (req, res) => {
  console.log("filter product", req.body.filter_state);
  const { instock, outstock, range } = req.body.filter_state;
  const low = range[0];
  const high = range[1];
  
  try {
    if (instock && outstock) {
    const product=await Product.aggregate([
        { $match: { price: { $lte: high, $gte: low } } },
        { $sort: { price: 1 } },
      ])
      console.log(product,'filter product');
      if(product){
     const pop= await Category.populate(product, { path: 'categorytId', select: '_id name' })
     console.log('pop',pop);
     if(pop){
        resSucc_data(res, 200, pop)
     }
     else{
        resErr(res, 400, 'not found') 
     }
      }

    } else if (instock && !outstock) { 
    const product=await Product.aggregate([
        { $match: { price: { $lte: high, $gte: low },quantity: { $gte: 0 } } },
        { $sort: { price: 1 } },
      ])
      console.log(product,'filter product');
      if(product){
     const pop= await Category.populate(product, { path: 'categorytId', select: '_id name' })
     console.log('pop',pop);
     if(pop){
        resSucc_data(res, 200, pop)
     }
     else{
        resErr(res, 400, 'not found') 
     }
      }
    } else if (outstock && !instock) { 
    const product=await Product.aggregate([
        { $match: { price: { $lte: high, $gte: low },quantity: { $lte: 0 } } },
        { $sort: { price: 1 } },
      ])
      console.log(product,'filter product');
      if(product){
     const pop= await Category.populate(product, { path: 'categorytId', select: '_id name' })
     console.log('pop',pop);
     if(pop){
        resSucc_data(res, 200, pop)
     }
     else{
        resErr(res, 400, 'not found') 
     }
      }
    } else {
      resSucc_data(res, 200, null);
    }
  } catch (error) {
    resErr(res, 400, error);
  }
};

exports.get_one_product = (req, res) => {
  console.log("get one product");
  try {
    Product.findOne({ productId: req.body.productId })
      .select("_id name productId  price ")
      .exec((err, data) => {
        if (err) resErr(res, 400, err);
        if (data) console.log(data);
        resSucc_data(res, 200, data);
      });
  } catch (error) {
    resErr(res, 400, error);
  }
};

exports.searchproduct = (req, res) => {
  console.log("search product");
  try {
  } catch (error) {
    resErr(res, 400, error);
  }
};
