const express =require('express')
const { require_auth, isAdmin, is_super_Admin } = require('../commen-middleware/auth')
const { employee_AtendenceGet } = require('../controller/employeeAdmin')

const router=express.Router()


router.post('/atendence',require_auth,is_super_Admin,employee_AtendenceGet)




module.exports = router