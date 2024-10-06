const usermodel = require("../models/usermodel");
const bcrypt=require('bcryptjs')

//GET USER INFO
const getUsercontroller=async (req,res)=>{
    try {
        //find user
        const user = await usermodel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        //hide password
        user.password=undefined
        //response
        res.status(200).send({
            success:true,
            message:"user get successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in Get user API",
            error
        })
    }
};    
//UPDATE USER
const updateUserController=async (req,res)=>{
    try {
        const user=await usermodel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        const {username,address,phone}=req.body
        if(username) user.username=username
        if(address) user.address=address
        if(phone) user.phone=phone
        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:"user updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:"Error on user Update",
            error
        })
    }
};
const resetPasswordController=async(req,res)=>{
    try {
        const{email,newPassword,answer}=req.body
        if(!email||!newPassword||!answer){  
            return res.status(500).send({
                success:false,
                message:"please provide all fields"
            })
        }
        const user=await usermodel.findOne({email,answer})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        var salt=bcrypt.genSaltSync(10);
        const hashedpassword=await bcrypt.hash(newPassword,salt);
        user.password=newPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:"password reset successful"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in RESET API",
            error
        })
    }
};
const updatepasswordcontroller=async (req,res)=>{
    try {
        //find user
        const user= await usermodel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        //get data from user
        const{oldpassword,newpassword}=req.body
        if(!oldpassword||!newpassword){
            return res.status(500).send({
                success:false,
                message:"Error in password update API"
            })
        }
        //check user password or compare passowrd
        const isMatch=await bcrypt.compare(oldpassword,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                messgae:"ivnalid old password"
            })
        }
        user.password=newpassword
        var salt=bcrypt.genSaltSync(10);
        const hashedpassword=await bcrypt.hash(newpassword,salt);
        user.password=hashedpassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"password updated successfully"
        })
    } catch (error) {
        console.log(error)
        re.status(500).send({
            success:false,
            message:"Error in password update API"
        })
    }

};
//DELETE user
const deleteusercontroller=async(req,res)=>{
    try {
        await usermodel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"user deleetd successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in delete API",
            error
        })
    }
};

   
module.exports={getUsercontroller,updateUserController,
    resetPasswordController,updatepasswordcontroller,deleteusercontroller};