const Category = require("../models/category");
const Dummy=require("../models/dummy")
const { resErr } = require("./ErrorHandle/res.error");
const { resSucc_data } = require("./successHandle.js/res.success");

const getcategorylistextend=(data,parentId=null)=>{
    const categorylistextend=[]
    let category
    if(!parentId || parentId == "" ){
        category=data.filter(cat=>cat.parentId==undefined)
        //console.log(category)
    }
    if(parentId && parentId != ""){      
        category=data.filter(cat=>cat.parentId==parentId)
    }
    for(i of category){ 
        categorylistextend.push({
            _id:i._id,
            name:i.name,
            type:i.type,
            parentId:i.parentId,
            children:getcategorylistextend(data,i._id)
        })
       // console.log('push',i.name)

    }
    return categorylistextend
}

exports.createCategory = async (req, res) => {
  console.log("create category");
  try {
    console.log(req.body);
    let { name, type, parentId } = req.body;
    if(parentId==""){parentId=null}
    const category = new Category({
      name,
      type,
      parentId,
    });
    await category.save((err, data) => {
      if (err) {
        resErr(res, 400, err);
      }
      // if (!data) {
      //   resErr(res, 404, 'created category data not found');
      // }
      if (data) {
        resSucc_data(res,201,data)
      }
    });
  } catch (error) {
    resErr(res, 400, error);
  }

};
exports.getcategory = async (req, res) => {
  console.log("get category");
  try {
    await Category.find().exec((err, data) => {
      if (err) {
        resErr(res, 400, err);
      }
      if (!data) {
        resErr(res, 404, 'category data not found');
     
    }
      if (data) {
          const categorieslist= getcategorylistextend(data)
          resSucc_data(res,201,categorieslist)

      }
    });
  } catch (error) {
    resErr(res, 400, error);
  }
 
  
};

exports.deletecategory = async (req, res) => {
  console.log("delete category");
  const id = req.params.id;
  try {
    await Category.findByIdAndDelete({ _id: id }).exec((err, data) => {
      if (err) {
        resErr(res, 400, err);
      }
      if (data) {
        resSucc_data(res,201,data)
      }
    });
  } catch (error) {
    resErr(res, 400, error);
  }
};


exports.editcategory= async(req,res)=>{
  console.log("update category");
  try {
  const category= await Category.findOne({_id:req.params.id})
  if(!category){resErr(res, 400, 'any category not found');}
  if(req.body.name){
    category.name=req.body.name
  }
  if(req.body.type){
    category.type=req.body.type
  }
  if(req.body.parentId){
    category.parentId=req.body.parentId 
  }else{
    category.parentId=null
  }
  const updatedcategory= await category.save()
  resSucc_data(res,201,updatedcategory)
  } catch (error) {
    resErr(res, 400, error);
  }

}


exports.searchcategory = async (req, res) => {
  console.log("search category");
  try {
    const data=await Category.find({$text:{}})
    console.log(data);
    resSucc_data(res,200,data)
  } catch (error) {
    resErr(res, 400, error);
  }
};


exports.dummy_add= async (req, res) => {
  console.log("add dummy ",req.body);
  try {
    const {name,type}=req.body
    const dummy=new Dummy({
      name,
      type
    })
    console.log(dummy);
    await dummy.save((err,data)=>{
      if(err){console.log(err,'error');}
      if(data){
        console.log(data)
        resSucc_data(res,200,data)
      }
    })
  
  } catch (error) {
    resErr(res, 400, error);
  }
};

exports.search_dummy = async (req, res) => {
  console.log("search dummy");
  try {
    
    await Dummy.find({$text: {$search:""}}).exec((err,data)=>{
      if(data){console.log(data);
      resSucc_data(res,200,data)}
      if(err){
        console.log(err);
      }
    })
    
  } catch (error) {
    resErr(res, 400, error);
  }
};
