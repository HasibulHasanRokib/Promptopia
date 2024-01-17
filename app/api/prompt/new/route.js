import PromptModel from "@/models/prompt";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request){
 const {prompt,tag,userId}= await request.json();
 try {
    await connectDB();
    const newPrompt= await PromptModel.create({prompt,tag,userId});
    return NextResponse.json({message:"New prompt created",newPrompt},{status:201})
 } catch (error) {
    return NextResponse.json({message:"Server not response."},{status:500})
 }   
}