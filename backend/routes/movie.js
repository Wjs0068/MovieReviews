import express from "express";
import { getMovie, getMovies, getMovieTitle } from "../controllers/movies.js";

const router = express.Router();

router.get("/:page", getMovies);
router.get("/chosen/:id", getMovie);
router.get("/search/movie/:title", getMovieTitle);

export default router;
