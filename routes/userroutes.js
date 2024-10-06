const express=require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { updateUserController, getUsercontroller, resetPasswordController, updatepasswordcontroller, deleteusercontroller } = require("../controllers/usercontroller");
const router=express.Router();
//routes
//GET USER || GET
router.get('/getUser',authmiddleware, getUsercontroller)
module.exports=router;
//UPDATE PROFILE
router.put('/userUpdate',authmiddleware,updateUserController)
//UPDATE password
router.post('/updatepassword',authmiddleware,updatepasswordcontroller)
//RESET password
router.post('/userReset',authmiddleware,resetPasswordController)
//DELETE user
router.delete('/deleteUser',authmiddleware,deleteusercontroller)