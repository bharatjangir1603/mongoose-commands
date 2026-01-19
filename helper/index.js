import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/geo-json")
    .then(res => console.log("db commected successfylly"))
    .catch(res => console.log("Error to connect db: ", res?.message))
}

export {
    connectDB,
}