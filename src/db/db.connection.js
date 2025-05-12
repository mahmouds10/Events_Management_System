import mongoose from "./global-setup.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas connected successfully");
    } catch (error) {
        console.error("MongoDB Atlas connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
