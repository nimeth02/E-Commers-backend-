const express =require('express')
const { require_auth, isAdmin, is_super_Admin } = require('../commen-middleware/auth')
const { createsupplier, get_all_suppliers, get_one_supplier, deletesupplier, edit_supplier, delete_supplier } = require('../controller/supplier')
const router=express.Router()

router.post('/create',require_auth,is_super_Admin,createsupplier)
router.put('/edit/:id',require_auth,isAdmin,edit_supplier)
router.get('/getall',require_auth,is_super_Admin,get_all_suppliers)
router.delete('/delete/:id',require_auth,is_super_Admin,delete_supplier)

module.exports = router