const { verifyToken } = require("../config/login.config");
const { resErr } = require("../controller/ErrorHandle/res.error");

exports.require_auth = (req, res, next) => {
  try {
    const jwt_token = req.cookies["jwt"];
  if (!jwt_token) resErr(res, 400, "cookies not found. you should login");

  next();
  } catch (error) {
    //resErr(res, 400, error);
  }
  
};


exports.isAdmin = async (req, res, next) => {
 try {
  
  req.user = await verifyToken(req.cookies["jwt"]);
  if(req.user.role == 'admin' || req.user.role == 'super_admin') {next() ;
 }
 else{
  resErr(res, 400, "Access denied. you are not Admin")
  
 }
 } catch (error) {
 
 // resErr(res, 400, error);
 }

};
exports.is_super_Admin = async (req, res, next) => {
  
  try {

   req.user = await verifyToken(req.cookies["jwt"]);
   if(req.user.role == 'super_admin') { next()}
 else{
  resErr(res, 400, "Access denied. you are not Super Admin");
 }
  
  } catch (error) {
  
  }
 
 };


exports.isUser = (req, res, next) => {};
