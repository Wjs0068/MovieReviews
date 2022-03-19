import reviewModel from "../models/Reviews.js";

export const getReview = async (req, res) => {
  const id = req.params.id;

  try {
    const reviews = await reviewModel.find({ movie_id: id });

    res.status(200).json({ item: reviews });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addReview = async (req, res) => {
  const review = req.body;

  try {
    const newReview = new reviewModel(review);
    await newReview.save();
    res.status(200).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    await reviewModel.findByIdAndDelete(id).exec();
    res.send("successfully deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editReview = async (req, res) => {
  const id = req.params.id;

  const edit = req.body;

  try {
    await reviewModel.findByIdAndUpdate(id, edit);
    res.send("Successfully updated");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
