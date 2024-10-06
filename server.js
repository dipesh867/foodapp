const express=require("express")
const port=process.env.port||5000;
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const morgan=require("morgan");
const connectdb = require("./config/db");//database link
//middlewares
app.use(cors());
app.use(express.json());//for user data
app.use(morgan("dev"));
dotenv.config();
//db connection
connectdb();//for db connection
app.use('/foodapp/v1/test',require("./routes/testroutes"))//for testing the request
app.use('/foodapp/v1/auth',require("./routes/authroutes"))//for authentication
app.use('/foodapp/v1/User',require("./routes/userroutes"))//for user 
app.use('/foodapp/v1/resturant',require('./routes/resturantroutes'));//for resturant routes
app.use('/foodapp/v1/category',require('./routes/categoryroutes'));//for category
app.use('/foodapp/v1/food',require('./routes/foodroutes'));//for food
app.get('/',(req,res)=>{
    return res
    .status(200)
    .send("welcome to the food server app API")
});
app.listen(port,()=>{  
    console.log(`server running on port ${port}`)
});







