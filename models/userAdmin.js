const mongoose =require('mongoose')


const userschema=new mongoose.Schema({
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
    password:{
        type:String,
        trim:true,
        require:true,
        min:4
    },
    role:{
        type:String,
        enum:["user","admin","super_admin"],
        default:"user"
    },
    mobilenumber:{
        type:String,
        require:true,
    }
}, { collection: 'user',timestamps:true})

userschema.virtual('fullname')
.get(function(){
    return `${this.firstname} ${this.lastname}`
});


module.exports=mongoose.model('User',userschema)