import PromptModel from "@/models/prompt";
import connectDB from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = async(request,{params})=>{
    try {
        await connectDB();
        const {id}=params;

        const prompts = await PromptModel.find({userId:id}).populate("userId")

        return NextResponse.json({prompts},{status:200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Server not working."},{status:500})
    }
}