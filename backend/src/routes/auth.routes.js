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

/**
 * route :GET /api/auth/logout
 */
const {logoutUserController}=require("../controllers/auth.controller")
authRouter.get("/logout",logoutUserController);

/**
 * route : GET /api/auth/get-me
 */
const {authMiddleware} =require("../middlewares/auth.middleware")
const {getmeUserController}=require("../controllers/auth.controller")
authRouter.get("/get-me",authMiddleware,getmeUserController);

/**
 * 
 */



module.exports=authRouter;
 