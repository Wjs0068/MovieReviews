import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import ReviewForm from "./ReviewForm";

function Modal({ showModal, modalHidden, id, setShowModal }) {
  const [movie, setMovie] = useState({});
  const [comments, setComments] = useState(null);
  const [open, setOpen] = useState(false);

  const { user } = useAuth0();

  const getMovieData = (id) => {
    axios.get(`http://localhost:3001/movies/chosen/${id}`).then((movie) => {
      setMovie(movie.data.item);
    });
  };

  const getReviewData = (id) => {
    axios.get(`http://localhost:3001/reviews/${id}`).then((review) => {
      setComments(review.data.item);
    });
  };

  useEffect(() => {
    getMovieData(id);
    getReviewData(id);
  }, [id]);
  const showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";

  const handleDelete = (commentId, id) => {
    axios
      .delete(`http://localhost:3001/reviews/delete/${commentId}`)
      .then(() => {
        getMovieData(id);
        getReviewData(id);
      });
  };

  const opening = () => {
    setOpen(true);
  };

  let year = new Date(movie.released);
  let cast = movie?.cast;

  return (
    <div onMouseLeave={modalHidden} className={showHideClassName}>
      <section className="modal-main">
        <div className="movie-items-container">
          <div className="img-container">
            <img className="image" src={movie.poster} alt={movie.title} />
          </div>

          <div className="text-container">
            <h4 className="headerFour">Average Rating</h4>
            <div className="rating-container">
              <p className="rating">{movie?.tomatoes?.viewer?.rating}</p>
              <p className="para">
                {movie?.tomatoes?.viewer?.numReviews} reviews
              </p>
            </div>

            <h4 className="headerFour">Release Date</h4>

            <p className="para">
              {year.toLocaleDateString("en-US", {
                timeZone: "UTC",
              })}
            </p>

            <h4 className="headerFour">Cast</h4>

            <div className="cast">
              {cast?.map((person, i) => {
                return (
                  <p className="person" key={i}>
                    {person}
                  </p>
                );
              })}
            </div>

            <h4 className="headerFour">Director</h4>
            <div className="para">
              {movie?.directors?.map((person, i) => {
                return (
                  <p className="person" key={i}>
                    {person}
                  </p>
                );
              })}
            </div>

            <button className="review-btn" onClick={opening}>
              Write review
            </button>
          </div>
        </div>

        <div className="comments-container">
          <h1 className="headerOne">{movie.title}</h1>
          <div className="reviews-container">
            {comments ? (
              comments.map((comment, i) => {
                return (
                  <div key={i} className="review-container">
                    <p className="date">
                      {new Date(comment.date).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                      })}
                    </p>
                    <p className="review">{comment.text}</p>

                    {user.email === comment.email ? (
                      <button
                        onClick={() => handleDelete(comment._id, id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })
            ) : (
              <h3>Be the first to write a review</h3>
            )}
          </div>
          {open ? (
            <ReviewForm
              id={id}
              setShowModal={setShowModal}
              getMovieData={() => getMovieData(id)}
              getReviewData={() => getReviewData(id)}
              setOpen={setOpen}
              open={open}
              // emailExists={emailExists}
            />
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Modal;
