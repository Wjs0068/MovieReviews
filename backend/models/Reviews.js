import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  email: String,

  movie_id: String,
  unique_id: { type: String, unique: true },
  text: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const reviewModel = mongoose.model("reviews", reviewSchema);

export default reviewModel;
