const express=require("express")
const app=express();
const authRouter=require("./routes/auth.routes")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const aiRouter=require("./routes/ai.routes")

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

/* auth routes here  : /api/auth      */
app.use("/api/auth",authRouter);

/* AI routes here  : /api/ai      */
app.use("/api/ai",aiRouter);


module.exports=app;