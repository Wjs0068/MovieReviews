import movieData from "../models/movies.js";

export const getMovies = async (req, res) => {
  const amountPerPage = 60;
  let page = req.params.page >= 1 ? req.params.page : 1;
  page = page - 1;
  const estimatedCount = await movieData.estimatedDocumentCount();

  const allMovies = await movieData
    .find()
    .limit(amountPerPage)
    .skip(amountPerPage * page);

  try {
    res.status(200).json({ items: allMovies, count: estimatedCount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMovieTitle = async (req, res) => {
  const lookup = req.params.title;

  try {
    const movie = await movieData.find({
      title: { $regex: ".*" + lookup + ".*" },
    });

    res.status(200).json({ item: movie });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getMovie = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await movieData.findById(id).exec();

    res.status(200).json({ item: movie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
