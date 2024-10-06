const foodmodel = require("../models/foodmodel");
const ordermodel = require("../models/ordermodel");

//create
const createfoodcontroller=async(req,res)=>{
    try {
        const{title,description,price,imageURL,foodTags,category,code,isAvailabla,resturant,rating}=req.body
        if(!title||!description||!price||!resturant){
            return res.status(500).send({
                success:false,
                message:"privide title,description and price of food"
            })
        }
        const newfood=new foodmodel({title,description,price,imageURL,foodTags,category,code,isAvailabla,resturant,rating})
        await newfood.save()
        res.status(500).send({
            success:true,
            message:"new foods created successfully"  
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in CREATE food API",
            error
        })
    }
};
//GET all food 
const getallfoodcontroller=async(req,res)=>{
    try {
        const foods=await foodmodel.find({})
        if(!foods){
            return res.status(404).send({
                success:false,
                message:"no foods found"
            })
        }
        res.status(200).send({
            success:true,
            food_number:foods.length,
            details:foods
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in GETALL food API",
            error
        })   
    }
};
//GET food by ID
const getfoodbyidcontroller=async(req,res)=>{
    try {
        const{id}=req.params
        if(!id){
            return res.status(200).send({
                success:false,
                message:"please provide ID"
            })
        }
        const food=await foodmodel.findById(id)
        if(!food){
            return res.status(404).send({
                success:false,
                message:"food not found"
            })
        }
        res.status(200).send({
            success:true,
            food
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in GET food API",
            error 
    })
}};
//GET food by resturant
const getfoodbyresturantcontroller=async(req,res)=>{
    try {
        const{id}=req.params
        if(!id){
            return res.status(200).send({
                success:false,
                message:"please provide restursnt ID"
            })
        }
        const food=await foodmodel.find({resturant:id})
        if(!food){
            return res.status(404).send({
                success:false,
                message:"food not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"food found on that resturant",
            food
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in GET food by resturant API",
            error 
    })
}};
//UPDATE food 
const updatefoodcontroller=async(req,res)=>{
    try {
        const foodid=req.params.id
        if(!foodid){
            return res.status(500).send({
                success:false,
                message:" please enter food id "
            })
        }
        const food=await foodmodel.findById(foodid)
        if(!food){
            return res.status(404).send({
                success:false,
                message:"invalid food id"
            })
        }
        const{title,description,price,imageURL,foodTags,category,code,isAvailabla,resturant,rating}=req.body
        await foodmodel.findByIdAndUpdate(foodid,{title,description,price,imageURL
            ,foodTags,category,code,isAvailabla,resturant,rating},{new:true})
            res.status(200).send({
            success:true,
            message:"food updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in UPDATE resturant API",
            error 
    })
    }
};
//DELETE food
const deletefoodcontroller=async(req,res)=>{
    try {
        const foodid=req.params.id
        if(!foodid){
            return res.status(500).send({
                success:false,
                message:" please enter food id "
            })
        }
        const food=await foodmodel.findById(foodid)
        if(!food){
            return res.status(404).send({
                success:false,
                message:"invalid food id"
            })
        }
        await foodmodel.findByIdAndDelete(foodid)
        res.status(200).send({
            success:true,
            message:"food deleted successfully"
        })
    } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:"error in DELETE resturant API",
                error 
            })
    }
};
//place order
const orderfoodcontroller=async(req,res)=>{
    try {
        const{cart}=req.body;
        if(!cart){
            return res.status(500).send({
                success:false,
                messgae:"please provide food cart or payment"
            })
        }
        let total=0;
        //calculate
        cart.map((i)=>{
            total+=i.price;
        })
        const newOrder=new ordermodel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        })
        await newOrder.save()
        res.status(200).send({
            success:true,
            messgae:"order palced successfully",
            newOrder
        })
        
    } catch (error) {
        console.log(error)
            res.status(500).send({
                success:false,
                message:"error in ORDER food API",
                error 
            })
    }
};
//order status
const orderstatuscontroller=async(req,res)=>{
    try {
        const orderid=req.params.id
        const{status}=req.body
        if(!orderid){
            return res.status(500).send({
                success:false,
                message:"please provide id"
            })
        }
        const order=await ordermodel.findByIdAndUpdate(orderid,{status},{new:true})
        res.status(200).send({
            success:true,
            messgae:"order status updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error order status API",
            error
        })   
    }
}
//exports
module.exports={
    createfoodcontroller,
    getallfoodcontroller,
    getfoodbyidcontroller,
    getfoodbyresturantcontroller,
    updatefoodcontroller,
    deletefoodcontroller,
    orderfoodcontroller,
    orderstatuscontroller}