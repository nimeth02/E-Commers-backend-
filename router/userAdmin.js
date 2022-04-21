const express=require('express')
const { require_auth, isAdmin, is_super_Admin } = require('../commen-middleware/auth')
const { user, signin, signup, logout, update, allusers } = require('../controller/userAdmin')
const router=express.Router()


router.post('/signin',signin)
router.post('/signup',signup)
router.get('/',require_auth,isAdmin,user,)
router.put('/update',require_auth,isAdmin,update)
router.get('/logout',require_auth,isAdmin,logout)
router.get('/dashboard/allusers',require_auth,is_super_Admin,allusers)





module.exports=router