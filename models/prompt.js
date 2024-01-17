import mongoose from "mongoose";

const promptSchema= new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
},
prompt:{
    type:String,
    required:[true,"Prompt is required."]
},
tag:{
    type:String,
    required:[true,"Tag is required"]
}
},{timestamps:true});

const PromptModel= mongoose.models.Prompts || mongoose.model("Prompts",promptSchema)

export default PromptModel;