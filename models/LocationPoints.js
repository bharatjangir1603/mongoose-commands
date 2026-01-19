import mongoose from "mongoose";

const LocationPoints = new mongoose.Schema({
    name: String,
    category: String,
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number,Number], // [lng, lat]
            required: true
        }
    }
});

LocationPoints.index({location: "2dsphere"});

export default mongoose.model("LocationPoints", LocationPoints, "LocationPoints");