const mongoose=require('mongoose')
//schema
const foodSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'food title is required']
        },
        description:{
            type:String,
            required:[true,'food description is required']
        },
        price:{
            type:Number,
            required:[true,'price is  required']
        },
        imageURL:{
            type:String,
            default:'www.apple.com'
        },
        foodTags:{
            type:String
        },
        category:{
            type:String,
        },
        code:{
            type:String
        },
        isAvailable:{
            type:Boolean,
            default:true
        },
        resturant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Resturant',
            required:[true,'resturant is required']
        },
        rating:{
            type:Number,
            default:3,
            min:1,
            max:5
        }
    },{timestamps:true})
//export
module.exports=mongoose.model('foods',foodSchema)