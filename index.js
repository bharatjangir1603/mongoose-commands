import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./helper/index.js";
import LocationPoints from "./models/LocationPoints.js";
import express from "express";

const app = express();

app.use(express.json());

// Optional: import JSON
// import data from "./json/GeoJSON-Objects.json" assert { type: "json" };

app.get("/welcome", (req, res) => 
    res.status(200).json({ status: 200, message: "success!" })
);

app.post("/nearest-points", async (req, res) => {
    console.log(req.body);
    const lng = 75.75383298956541;
    const lat = 26.897453720792505;
    const nearest_data = await LocationPoints.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng,lat],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: 6000,
        //   query: { isOpen: true },
        },
      },
    //   {
    //     $addFields: {
    //       eta: {
    //         $add: ["$avgPrepTime", { $divide: ["$distance", 300] }],
    //       },
    //     },
    //   },
    //   {
    //     $addFields: {
    //       score: {
    //         $add: [
    //           { $multiply: ["$rating", 2] },
    //           { $multiply: ["$ordersCount", 0.0001] },
    //           { $cond: ["$isPromoted", 5, 0] },
    //           { $multiply: ["$eta", -1] },
    //         ],
    //       },
    //     },
    //   },
    //   { $sort: { score: -1 } },
    //   { $limit: 20 },
    ]);

    return res.status(200).json({status: 200, data: nearest_data});

})

// Use async function to start DB + server
async function startServer() {
    await connectDB();
    app.listen(2508, () => {
        console.log("Server is listening at", 2508);
    });
}

startServer();


(async () => {
  try {
    const res = await LocationPoints.countDocuments();
    console.log(1111111111, res);

    // Purani chungi
    const lng = 75.75383298956541;
    const lat = 26.897453720792505;
    const nearest_data = await LocationPoints.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng,lat],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: 6000,
        //   query: { isOpen: true },
        },
      },
    //   {
    //     $addFields: {
    //       eta: {
    //         $add: ["$avgPrepTime", { $divide: ["$distance", 300] }],
    //       },
    //     },
    //   },
    //   {
    //     $addFields: {
    //       score: {
    //         $add: [
    //           { $multiply: ["$rating", 2] },
    //           { $multiply: ["$ordersCount", 0.0001] },
    //           { $cond: ["$isPromoted", 5, 0] },
    //           { $multiply: ["$eta", -1] },
    //         ],
    //       },
    //     },
    //   },
    //   { $sort: { score: -1 } },
    //   { $limit: 20 },
    ]);

    console.log("nearest_data", JSON.stringify(nearest_data));
  } catch (error) {
    console.log("Error", error);
  } finally {
    // process.exit(1);
  }
})();
