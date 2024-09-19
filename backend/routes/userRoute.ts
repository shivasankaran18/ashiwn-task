import express from "express"
import { listAllUsers, userDetail, userLogin, userReg } from "../controllers/userController";
import {authMiddleware, userAuthMiddleware} from "../middleware/auth"

const userRouter = express.Router();


userRouter.post("/register",userReg)
userRouter.post("/login",userLogin)
userRouter.get("/details",userAuthMiddleware,userDetail)

export {userRouter}