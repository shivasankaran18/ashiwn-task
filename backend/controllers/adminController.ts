import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Response, Request } from "express";


const prisma=new PrismaClient();
type adminreg={
    email:string,
    name:string,
    password:string

}

const createToken = (id:any)=>{
    return jwt.sign({id},process.env.ADMIN_JWT_SECRET || "");
}

export const adminRegister=async(req:Request,res:Response)=>{
    try{
        const body:adminreg = req.body ;
        console.log(body)
        
        const password = body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        const newAdmin = await prisma.admin.create({
            data:{
                email:body.email,
                name:body.name,
                password:hashedPass,
               
            }
        })
        console.log(newAdmin)
        const token = createToken(newAdmin.email);
        return res.status(200).json({message:"Admin Created",token:"Bearer "+token})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:err});
    }

}


export const adminLogin = async(req:any,res:any) =>{
    try{
        const body = req.body;
      
      
        const admin = await prisma.admin.findUnique({
            where:{
                email:body.email
            },select:{
                password:true
            }
        })
        if(!admin){
            return res.status(500).json({message:"Admin not found"})
        }
        const verifyPass = await bcrypt.compare(body.password,admin.password);
        if(!verifyPass){
            return res.status(500).json({message:"Invalid Password"})
        }
        const token = createToken(body.email);
        return res.status(200).json({token:"Bearer "+token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:err})
    }
}