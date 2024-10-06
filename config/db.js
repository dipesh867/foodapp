const mongoose= require("mongoose")
const connectdb=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/food-app")
        console.log(`connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("DB error ",error);
    }
};
module.exports=connectdb;