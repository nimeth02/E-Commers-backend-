const mongoose=require('mongoose')


const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        
    },
    type:{
        type:String
    },
    parentId:{
        type:String
    },
    children:[],
    
},{collection:'category'})
// categoryschema.index({name: 'text'});
module.exports=mongoose.model('Category',categoryschema)