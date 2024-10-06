const express=require("express");
const { registercontroller, logincontroller } = require("../controllers/authcontrollers");

const router=express.Router()
//routes
router.post('/register',registercontroller);
//REGISTER POST
router.post('/login',logincontroller);
//LOGIN POST
module.exports=router;
