const express =require('express')
const { require_auth, isAdmin, is_super_Admin } = require('../commen-middleware/auth')
const { add_sell, get_all_sold } = require('../controller/sell')
const router=express.Router()


router.post('/add',require_auth,isAdmin,add_sell)
router.get('/getAll',require_auth,is_super_Admin,get_all_sold)



module.exports = router