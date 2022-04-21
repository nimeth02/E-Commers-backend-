const User = require("../models/userAdmin");
const { resErr } = require("./ErrorHandle/res.error");
const { resSucc_data, resSucc_Msg } = require("./successHandle.js/res.success");
const bcrypt = require("bcrypt");
const { authToken, hash, compare } = require("../config/login.config");
const jwt = require("jsonwebtoken");
const EmployeeAdmin = require("../models/employeeAdmin");
const { employeeOpens, employeeClose } = require("./employeeAdmin");

exports.signup = async (req, res) => {
  console.log("signup");
  try {
    const { name, email, password, mobilenumber } = req.body;
    await User.findOne({ email: email }).exec(async (err, data) => {
      if (err) resErr(res, 400, err);
      if (data) resErr(res, 400, "user already registered");
      if (!data) {
        hash_password = await hash(password, 10);
        const user = new User({
          name,
          email,
          password: hash_password,
          mobilenumber,
          role: "admin",
        });
        await user.save((err, data) => {
          if (err) resErr(res, 400, err);
          if (data) resSucc_Msg(res, 201, "user Created successfully");
        });
      }
    });
  } catch (error) {
    resErr(res, 400, error);
  }
};
exports.signin = async (req, res, next) => {
  console.log("signin");
  try {
    const { email, password } = req.body;
    await User.findOne({ email: email })
      .select(" -createdAt -updatedAt ")
      .exec(async (err, data) => {
        if (err) resErr(res, 400, err);
        if (!data) resErr(res, 400, "user not registered");

        if (data) {
          if (await compare(password, data.password)) {
            const { _id, name, mobilenumber, role } = data;
            const today=new Date().toLocaleDateString()
            const token = await authToken({ _id: _id, role: role,Date:today });
            res.cookie("jwt", token, {
              httpsOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
           
        await employeeOpens(req,res,next,_id,today)
       
             resSucc_data(res, 200, "successfully signin");
            
          } else {
            resErr(res, 401, "invalied password");
          }
        }
      });
  } catch (error) {
    resErr(res, 400, error);
  }
};
exports.user = async (req, res) => {
  console.log("user");
  try {
    User.findOne({ _id: req.user._id })
      .select(" -createdAt -updatedAt -password")
      .exec((err, data) => {
        if (err) resErr(res, 404, err);
        if (!data) resErr(res, 404, "user not found");
        if (data) {
          resSucc_data(res, 200, data);
        }
      });
  } catch (error) {
    resErr(res, 400, error);
  }
};
exports.logout =async (req, res,next) => {
  console.log("logout");
 
  try {
    const today=req.user.Date
    const _id=req.user._id
   
    await employeeClose(req,res,next,_id,today)
    
    res.cookie("jwt", null, {
      httpsOnly: true,
      maxAge: 5,
    });
    resSucc_Msg(res, 200, "logout succesfully");
  } catch (error) {
    resErr(res, 400, error);
  }
};
exports.update = async (req, res) => {
  console.log("update");
  try {
    const { name, mobilenumber, password } = req.body;
    
    const user = await User.findOne({ _id: req.user._id })
    user.name=name
    user.mobilenumber=mobilenumber
    if(password){
      const hash_password = await hash(password, 10);
      user.password=hash_password
    }
   
    await user.save((err,data)=>{
        if (err) resErr(res, 400, err);
          if (data) {
              const {password,updatedAt,createdAt,...userdata}=data.toJSON()
              resSucc_data(res, 201,userdata );}
    })
      
    console.log(user);
  } catch (error) {
    resErr(res, 400, error);
  }
};

exports.allusers = async (req, res) => {
  console.log("allusers");
  try {
    
    User.find({ role: 'admin' })
      .select("_id name mobilenumber email")
      .exec((err, data) => {
        if (err) resErr(res, 404, err);
        if (!data) resErr(res, 404, "users not found");
        if (data) {
          resSucc_data(res, 200, data);
        }
      });
  } catch (error) {
    resErr(res, 400, error);
  }
};