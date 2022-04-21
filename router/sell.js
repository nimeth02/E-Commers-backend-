const express =require('express')
const { require_auth, isAdmin, is_super_Admin } = require('../commen-middleware/auth')
const { add_sell, get_all_sold, get_all_sold_by_admin, get_totals } = require('../controller/sell')
const router=express.Router()


router.post('/add',require_auth,isAdmin,add_sell)
// router.get('/getByadmin/:id',require_auth,isAdmin,get_all_sold_by_admin)
router.post('/getAll',require_auth,is_super_Admin,get_all_sold)
router.post('/gettotals',require_auth,is_super_Admin,get_totals)



module.exports = router