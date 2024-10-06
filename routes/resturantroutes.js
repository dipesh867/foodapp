const express=require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createresturantController, getAllresturantcontroller, getResturantbyidcontroller
    , deleteResturantController } = require("../controllers/resturantcontroller");

const router=express.Router();
//CREATE RESTURANT
router.post('/create',authmiddleware,createresturantController);

//GET all resturant
router.get('/getAll',getAllresturantcontroller);
//GET resturant on the basis of id
router.get('/get/:id',getResturantbyidcontroller);
//DELETE resturant
router.delete('/delete/:id',authmiddleware,deleteResturantController);
module.exports=router;