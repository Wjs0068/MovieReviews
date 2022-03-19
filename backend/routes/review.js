import express from "express";
import { getReview, addReview, deleteReview } from "../controllers/reviews.js";

const router = express.Router();

router.get("/:id", getReview);
router.post("/post", addReview);
router.delete("/delete/:id", deleteReview);

export default router;
