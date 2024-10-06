const resturantmodel = require("../models/resturantmodel");


const createresturantController=async(req,res)=>{
    try {
        const{title,imageUrl,foods,time,pickup,delivery,isopen,logourl,rating,ratingcount,coords}=req.body
        if(!title||!coords){
            res.staus(500).send({
                success:false,
                message:"please provide title and coords"
            })
        }
    const newResturant= new resturantmodel({title,imageUrl,foods,time,pickup,delivery,isopen,logourl,rating,ratingcount,coords})
    await newResturant.save();
    res.status(200).send({
        success:true,
        message:"new resturant created successfully"
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in CREATE resturant API",
            error
        })
    }
};
//GET all resturants
const getAllresturantcontroller=async(req,res)=>{
    try {
        const resturants=await resturantmodel.find({});
        if(!resturants){
            return res.status(404).send({
                success:false,
                messgae:"resturant not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"resturant found successfully",
            totalCount:resturants.length
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in GET all resturant API",
            error
        })
    }
};
//GET resturant on the basis of id
const getResturantbyidcontroller=async(req,res)=>{
    try {
        const resturantid=req.params.id
        if(!resturantid){
            return res.status(500).send({
                success:false,
                mesage:"please provide resturant id"
            })
        }
        const resturant=await resturantmodel.findById(resturantid)
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:"resturant not found",
                error
            });
        }
        res.status(200).send({
            success:true,
            resturant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            messgae:"error in GET resturant by id API",
            error,
        })
    }
};
//DELETE resturant 
const deleteResturantController=async(req,res)=>{
    try {
        const resturantid=req.params.id
        if(!resturantid){
            return res.status(500).send({
                success:false,
                message:"please provide resturant id"
            })
        }
        const resturant=resturantmodel.findById(resturantid)
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:"resturant not found"
            })
        }
        await resturantmodel.findByIdAndDelete(resturantid)
        res.status(200).send({
            success:true,
            message:"resturant deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in DELETE resturant API"
        })
    }
};

module.exports={createresturantController,getAllresturantcontroller,
    getResturantbyidcontroller,deleteResturantController}