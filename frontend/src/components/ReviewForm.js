import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./ReviewForm.css";

function ReviewForm({
  id,
  getMovieData,
  getReviewData,
  setOpen,
  emailExists,
  open,
  edit,
  setEdit,
}) {
  const { user } = useAuth0();

  const [review, setReview] = useState({
    email: user.email,
    movie_id: id,
    unique_id: user.email + id,
    text: "",
    date: new Date(),
  });

  const changeOpen = () => {
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/reviews/post", review)
      .then(() => {
        changeOpen();
        getMovieData();
        getReviewData();
      })
      .catch((res) =>
        alert(
          "You have already posted a review. If you would like to post another, please delete your first review"
        )
      );
  };

  return (
    <div>
      <form className="review-container" onSubmit={submitHandler}>
        <textarea
          placeholder="Write your review here"
          label="review"
          className="reviews"
          value={review.text}
          onChange={(event) => {
            setReview({ ...review, text: event.target.value });
          }}
        ></textarea>
        <div className="btn-container">
          <button className="submit-btn" type="submit">
            Complete
          </button>
          <button onClick={changeOpen} className="exit-btn">
            Exit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
