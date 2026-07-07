require("dotenv").config();
const app=require("./src/app")
const {connectDB}=require("./src/db/db")
//const {invoke}=require("./src/services/ai.service")


connectDB();


app.listen(3000,()=>{
    console.log("server responding at post 3000")
})