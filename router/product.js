const express =require('express')
const { require_auth, isAdmin, is_super_Admin } = require('../commen-middleware/auth')
const { filterproduct, searchproduct, deleteproduct, editproduct, createproduct, getproduct, get_one_product } = require('../controller/product')
const router=express.Router()
const multer=require("multer")
const path =require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'/upload'))
    },
    filename: function (req, file, cb) {
      
      cb(null,file.originalname)
    }
  })
  
  const upload=multer({storage})


 router.post('/create',require_auth,isAdmin,upload.array('productimage'),createproduct)
 router.put('/update/:id',require_auth,isAdmin,upload.array('productimage'),editproduct)
router.post('/get',getproduct)
router.post('/getone',get_one_product)
router.delete('/delete/:id',require_auth,isAdmin,deleteproduct)
router.post('/search',searchproduct)
//router.post('/filter',filterproduct)

module.exports = router