import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"
import { compare } from "bcrypt"
import { loginSchema } from "@/utils/validateUser";

export async function POST(req:Request){
try {
  const body = await req.json();
  const parsed= loginSchema.safeParse(body)
  if(!parsed.success){
    return NextResponse.json(
      { error:"Invalid Input", details:parsed.error.issues},
      {status:400}
    );
  }
  const {email,password}=parsed.data;
  const user= await prisma.user.findUnique({where:{email}})
  if(!user){
    return NextResponse.json({error:"User not found"},{status:404})
  }
  const isValid= await compare(password,user.password);
  if(!isValid){
    return NextResponse.json({error:"Incorrect password"},{status:401})
  }
     return NextResponse.json({ message: "Login successful", user }, { status: 200 });
} catch (error) {
  console.error("Login Error", error);
  return NextResponse.json({error: "Internal Server Error"},{status:500})
}
}
