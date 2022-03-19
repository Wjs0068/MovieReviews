import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import routers from "./routes/movie.js";
import reviewRouters from "./routes/review.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_CLIENT);

app.use("/movies", routers);
app.use("/reviews", reviewRouters);

const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
