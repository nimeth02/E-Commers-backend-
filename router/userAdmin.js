const express=require('express')
const { require_auth, isAdmin } = require('../commen-middleware/auth')
const { user, signin, signup, logout, update } = require('../controller/userAdmin')
const router=express.Router()


router.post('/signin',signin)
router.post('/signup',signup)
router.get('/',require_auth,isAdmin,user,)
router.put('/update',require_auth,isAdmin,update)
router.get('/logout',require_auth,isAdmin,logout)





module.exports=router