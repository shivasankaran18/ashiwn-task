import express from "express"
import cors from "cors"

import { adminRouter } from "./routes/adminRoutes";

import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routes/userRoute";


const app = express();
const prisma = new PrismaClient();
app.use(express.json())
app.use(cors())
const BACKEND_PORT = 6969




app.listen(BACKEND_PORT,()=>{
    console.log("Running")
})

app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)

app.delete("/delete",async(req,res)=>{
    try{
        const deleted = await prisma.admin.deleteMany({
          
        })
        return res.json({message:"Deleted"})
    }catch(er){
        console.log(er)
        return res.json({message:er})
    }
})

app.get("/check",(req,res)=>{
    return res.send("running")
})