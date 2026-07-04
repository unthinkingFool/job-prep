const express=require("express")
const app=express();
const authRouter=require("./routes/auth.routes")

app.use(express.json());

/* auth routes here  : /api/auth      */
app.use("/api/auth",authRouter);


module.exports=app;