const mongoose=require("mongoose")

//schema
const categoryschema=new mongoose.Schema({
   title:{
    type:String,
    required:[true,'category title is required']
   },
   imageURL:{
    type:String
   }

},{timestamps:true})
module.exports=mongoose.model('category',categoryschema)