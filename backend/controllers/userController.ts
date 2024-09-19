import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request,Response } from "express";

const prisma=new PrismaClient();

const createToken = (id:any)=>{
    return jwt.sign({id},process.env.USER_JWT_SECRET || "");
}

export const userReg=async(req:Request,res:Response)=>{

    try{
        const {name,contactno,password,email,dob,gender}=req.body
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        await prisma.user.create({
            data:{
                name,
                contactno,
                password:hashedPass,
                email,
                dob,gender
            }
        })

        return res.status(200).json({msg:"done"})

    }
    catch{
        return res.status(500).json({msg:"error"})
    }
}

export const userLogin = async(req:Request,res:Response) =>{
    try{
        const body = req.body;
      
      
        const user = await prisma.user.findUnique({
            where:{
                email:body.email
            },select:{
                password:true
            }
        })
        if(!user){
            return res.status(500).json({message:"USer not found"})
        }
        const verifyPass = await bcrypt.compare(body.password,user.password);
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

export const userDelete=async(req:Request,res:Response)=>{
    try{

        const {email}=req.body;

        await prisma.user.delete({
            where:{
                email
            }
        })
        return res.status(200).json({"msg":"done"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:'error'})
    }

}

export const listAllUsers=async(req:Request,res:Response)=>{
    try{
        const users=await prisma.user.findMany();
        return res.status(200).json({users})
    }
    catch{
        return res.status(500).json({msg:"error"})
    }
}

export const userDetail=async(req:Request,res:Response)=>{
    try{
        // const {email}=req.body.email;
        const user=await prisma.user.findUnique(
            {
                where:{
                    //@ts-ignore
                    email:req.headers.email
                }
            }
        )
        return res.status(200).json({user})

    }
    catch{
        return res.status(500).json({msg:"error"})
    }
}
