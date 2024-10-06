const express=require('express')
const authmiddleware = require('../middlewares/authmiddleware')
const { createcategorycontroller, getallcategorycontroller, updatecategorycontroller, deletecategorycontroller } = require('../controllers/categorycontrollers')

const router=express.Router()
//CREATE category
router.post('/create',authmiddleware,createcategorycontroller)
//GET all category
router.get('/getall',getallcategorycontroller)
//UPDATE category
router.put('/update/:id',authmiddleware,updatecategorycontroller)
//DELETE category
router.delete('/delete/:id',authmiddleware,deletecategorycontroller)
module.exports=router
