const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

//hashing password
exports.hash=async(password,count=10)=>{
return await bcrypt.hash(password,count)
}
exports.compare=async(password,hash_password)=>{
    return await bcrypt.compare(password,hash_password)
    }

//jwt token    
exports.authToken=async(user_data)=>{
    const token=await jwt.sign(user_data,process.env.MERN_SECRET)
    return token  
}
exports.verifyToken=async(user_data)=>{
    const user=await jwt.verify(user_data,process.env.MERN_SECRET)
    return user  
}