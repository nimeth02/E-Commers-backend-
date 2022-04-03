

exports.resErr=(res,status=400,message)=>{
    console.log(message);
    if(message== '')message='response error'
    res.status(status).json({message:message})
    // console.log(res.status);
}