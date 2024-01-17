import PromptModel from "@/models/prompt";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
      await connectDB();
      const prompts= await PromptModel.find({}).populate('userId');
      return NextResponse.json({prompts},{status:200})  
    } catch (error) {
        return NextResponse.json({message:"Server not response."},{status:500})
    }
}