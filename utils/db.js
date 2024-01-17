import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is connected.")
    } catch (error) {
        console.log("MongoDB connected failed.",error)  
    }
}


export default connectDB;