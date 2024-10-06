const mongoose=require("mongoose")

//schema
const resturantschema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"'resturant is required"]
    },
    imageUrl:{
        type:String,
    },
    foods:{
        type:Array
    },
    time:{
        type:String,
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isopen:{
        type:Boolean,
        default:true
    },
    logourl:{
        type:String,

    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingcount:{
        type:String
    },
    coords:{
        id:{type:String},
        lattitude:{type:Number},
        lattitudeDelta:{type:Number},
        longitude:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}
    }
},{timestamps:true})
module.exports=mongoose.model('resturant',resturantschema)