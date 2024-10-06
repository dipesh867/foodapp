const express=require('express')
const authmiddleware = require('../middlewares/authmiddleware')
const { createfoodcontroller, getallfoodcontroller, getfoodbyidcontroller,
     getfoodbyresturantcontroller, updatefoodcontroller, deletefoodcontroller, 
     orderfoodcontroller,
     orderstatuscontroller} = require('../controllers/foodcontroller')
const adminmiddleware = require('../middlewares/adminmiddleware')
const router=express.Router()
//CREATE
router.post('/create',authmiddleware,createfoodcontroller)
//GETALL food 
router.get('/getall',getallfoodcontroller)
//GET foods by id
router.get('/get/:id',getfoodbyidcontroller)
//GET foods by resturant
router.get('/getfoodbyrest/:id',getfoodbyresturantcontroller)
//UPDATE food
router.put('/update/:id',authmiddleware,updatefoodcontroller)
//export
router.delete('/delete/:id',authmiddleware,deletefoodcontroller)
//palce order
router.post('/placeorder',authmiddleware,orderfoodcontroller)
//order status
router.post('/orderstatus/:id',authmiddleware,adminmiddleware,orderstatuscontroller)
module.exports=router