const usermodel=require('../models/usermodel')
module.exports=async(req,res,next)=>{
    try {
        const user=await usermodel.findById(req.body.id)
        if(!user){
            return res.status(404).send({
                success:false,
                message:"invalid  id"
            })
        }
        if(user.usertype!="admin"){
            return res.status(500).send({
                success:false,
                message:"only admin access"
            });
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
        success:false,
        message:"Un-Authorized Access",
        error
        })
    }
}