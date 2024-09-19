import express from "express"
import { adminLogin, adminRegister } from "../controllers/adminController";
import { authMiddleware } from "../middleware/auth";
import { listAllUsers, userDelete, userReg } from "../controllers/userController";


export const adminRouter = express.Router();

adminRouter.post("/register",adminRegister)
adminRouter.post("/login",adminLogin)
adminRouter.get("/users",authMiddleware,listAllUsers)
adminRouter.post("/createuser",authMiddleware,userReg)
adminRouter.post("/deleteuser",authMiddleware,userDelete)


