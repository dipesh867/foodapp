const mongoose=require("mongoose")

//schema
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    answer:{
        type:String,
        required:[true,'answer is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    usertype:{
        type:String,
        required:[true,'usertype is required'],
        default:"admin"
        
    },
    profile:{
        type:String,
        default:'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
    }
    
},{timestamps:true})
module.exports=mongoose.model('user',userschema)