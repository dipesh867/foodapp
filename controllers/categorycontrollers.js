const categorymodel = require("../models/categorymodel");

//CREATE category
const createcategorycontroller=async(req,res)=>{
    try {
        const {title,imageURL}=req.body
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:"please provide category title and imageURL"
            })
        }
        const newcategory=new categorymodel({title,imageURL})
        await newcategory.save()
        res.status(200).send({
            success:true,
            message:"category created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in CREATE category API",
            error
        })   
    }
};
//GET all category
const getallcategorycontroller=async(req,res)=>{
    try {
        const categories=await categorymodel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"no category found"
            })
        }
        res.status(200).send({
            success:true,
            totalcategories:categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in GET all category API",
            error
        })
    }
};
//UPDATE category
const updatecategorycontroller=async(req,res)=>{
    try {
        const{id}=req.params
        const{title,imageURL}=req.body
        if(!id){
            return res.status(500).send({
                success:false,
                message:"please enter id"
            })
        }
        const updatedcategory=await categorymodel.findByIdAndUpdate(id,{title,imageURL})
        updatedcategory.save
        if(!updatedcategory){
            res.staus(500).send({
                succes:false,
                message:"category not updated"
            })
        }
        res.status(200).send({
            success:true,
            message:"category updated successfully",
            categorymodel
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in UPDATE category API"
        })
    }
};
//DELETE category
const deletecategorycontroller=async(req,res)=>{
    try {
        const{id}=req.params
        if(!id){
            return res.status(500).send({
                success:false,
                message:"please provide category ID"
            })
        }
        const category=await categorymodel.findById(id)
        if(!category){
            return res.status(404).send({
                success:false,
                message:"category not found"
            })
        }
        await categorymodel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in DELETE controller API"
        })
    }
}

module.exports={createcategorycontroller,getallcategorycontroller,updatecategorycontroller,deletecategorycontroller}