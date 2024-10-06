
const userModel = require("../models/usermodel");
const bcrypt=require("bcryptjs")
const JWT=require("jsonwebtoken")

const registercontroller= async(req,res)=>{
    try {
        const {username,email,password,phone,address,answer,usertype}=req.body
        //validation
        if(!username|| !email|| !password||!phone||!address||!answer){
            return res.send({
                success:false,
                message:'please provide All data'
            });
        }
        //check user
        const existing=await userModel.findOne({email})
            if(existing){
                return res.send({
                    success:false,
                    message:'Email already registered please login'
                });
            }
            //hashing password
            var salt =bcrypt.genSaltSync(10);
            const hashedpassword= await bcrypt.hash(password,salt)
            //create new user
        const user=await userModel.create({username,password:hashedpassword,phone,email,address,answer,usertype})
        res.send({
            success:true,
            messgae:'registered successfully',
            user
        })
    }
        
    catch (error) {
        console.log("error in register in API ",error)
        res.send({
            success:false,
            message:'Error in register in API',
            error     
        })
    }
};
//LOGIN
const logincontroller=async(req,res)=>{
    try {
        const {email,password}= req.body
        //validification 
        if(!email || !password){
            res.status(500).send({
                success:false,
                message:"insufficient data"
            })
        }
        //checking the user
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        //check user password | compare password
        const ismatch= await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(500).send({
                success:false,
                message:"invalid information"
            })
        }
        const token=JWT.sign({id:user._id},process.env.value,{
            expiresIn:"7d"
        })
        // user.password=undefined;//for hiding the password 
        res.status(200).send({
            success:true,
            message:"login successful",
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login API"
        })
    }
    
};
module.exports={logincontroller,registercontroller}