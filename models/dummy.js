const { default: mongoose } = require("mongoose");

const dummyschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
       
        
    },
    type:{
        type:String
    },
   
    
},{collection:'dummy'})
dummyschema.index({name: 'text',type:'text'});
module.exports=mongoose.model('Dummy',dummyschema)