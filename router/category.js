const express =require('express')
const { require_auth, isAdmin, is_super_Admin } = require('../commen-middleware/auth')
const { createCategory, editcategory, deletecategory, getcategory,searchcategory, search_dummy, dummy_add } = require('../controller/category')
const router=express.Router()


 router.post('/create',require_auth,is_super_Admin,createCategory)
 router.put('/update/:id',require_auth,is_super_Admin,editcategory)
router.get('/get',getcategory)
router.delete('/delete/:id',require_auth,is_super_Admin,deletecategory)
router.get('/search',searchcategory)
router.post('/dummy_add',dummy_add)
router.get('/dummy_get',search_dummy)
module.exports = router