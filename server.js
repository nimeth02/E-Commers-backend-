const express=require('express')
const app=express()
const path =require('path')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')

require('dotenv').config()

//middleware
app.use(cookieParser()) 
app.use(express.json()) 

app.use(cors({
    credentials:true,
    origin:['http://localhost:3000']
}))
app.use('/public',express.static(path.join(__dirname,'upload')))
//mongodb connect
try {
    mongoose.connect(process.env.Mongo_DB_COMPASS,(err,connect)=>{
        
        if(err){
            console.log(err,'error occured in mongo db')
            return
        }
        if(connect){
            console.log('databse connected')
           // console.log(connect)
            return
        }
        console.log('somwthing went wrong database not found')
        
   
}) 
} catch (error) {
    console.log(error)   
}

//routes
const userAdmin=require('./router/userAdmin')
app.use('/userAdmin',userAdmin)
const category=require('./router/category')
app.use('/category',category)
const product=require('./router/product')
app.use('/product',product)


//listen port 
const port=process.env.PORT || 6001

app.listen(port,(err)=>{
    if(!err){  
    console.log(`sever listened  ${port}`)
    }
})