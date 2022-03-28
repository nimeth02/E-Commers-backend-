exports.resSucc_data=(res,status=200,data)=>{
    res.status(status).json({data})
}


exports.resSucc_Msg=(res,status=200,message="success")=>{
    res.status(status).json({message:message})
}