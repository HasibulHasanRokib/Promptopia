import PromptModel from "@/models/prompt";
import connectDB from "@/utils/db"
import { NextResponse } from "next/server"

export const GET=async(request,{params})=>{
    try {
        await connectDB();
        const prompt=await PromptModel.findById(params.id)
        if(!prompt){
            return NextResponse.json({message:"Prompt not found."},{status:404})   
        }
        return NextResponse.json({prompt},{status:200})
    } catch (error) {
        return NextResponse.json({message:"server is not working."},{status:500})
    }
}
export const PATCH=async(request,{params})=>{
      
    const {prompt,tag}=await request.json();

    try {
        await connectDB();
        const promptExist=await PromptModel.findById(params.id)
        if(!promptExist){
            return NextResponse.json({message:"Prompt not found."},{status:404})   
        }

        promptExist.prompt=prompt;
        promptExist.tag=tag;

        await promptExist.save();
        
        return NextResponse.json({promptExist},{status:200})
    } catch (error) {
        return NextResponse.json({message:"server is not working."},{status:500})
    }
}

export const DELETE=async(request,{params})=>{
    try {
        await connectDB();
        const prompt=await PromptModel.findByIdAndDelete(params.id)
        if(!prompt){
            return NextResponse.json({message:"Prompt not found."},{status:404})   
        }
        return NextResponse.json({prompt},{status:200})
    } catch (error) {
        return NextResponse.json({message:"server is not working."},{status:500})
    }
}