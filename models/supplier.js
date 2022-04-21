const mongoose =require('mongoose')


const supplierschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        require:true
    },
    mobilenumber:{
        type:String,
        require:true,
    }
}, { collection: 'supplier',timestamps:true})




module.exports=mongoose.model('Supplier',supplierschema)