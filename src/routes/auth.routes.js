const express =require("express");

const authRouter=express.Router();

/**
 *  route :  POST /api/auth/register
 */
const {registerUserController}=require("../controllers/auth.controller")
authRouter.post("/register",registerUserController);

/**
 * route : POST /api/auth/login
 */
const {loginUserController}=require("../controllers/auth.controller")
authRouter.post("/login",loginUserController);


module.exports=authRouter;
 