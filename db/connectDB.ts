import mongoose, { mongo } from "mongoose";

export const connectDB = async (uri: string) => {
    try {
        await mongoose.connect(uri)
    } catch (error) {
        console.log(error);
        
    }
}