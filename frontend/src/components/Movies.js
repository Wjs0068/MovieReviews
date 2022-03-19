import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Movies.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "./Modal.js";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar.js";
import { FaSistrix } from "react-icons/fa";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

function Movies() {
  const [picture, setPicture] = useState([]);
  const [amount, setAmount] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);

  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [search, setSearch] = useState({
    title: "",
  });

  const cache = createCache({
    key: "css",
    prepend: true,
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${page}`).then((movies) => {
      setPicture(movies.data.items);
      setAmount(movies.data.count);
    });
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
    window.scroll({ top: 0, left: 0 });
  };

  const getMovies = (title) => {
    axios
      .get(`http://localhost:3001/movies/search/movie/${title}`)
      .then((movies) => {
        setPicture(movies.data.item);
        setAmount(movies.data.count);
      });
  };

  const modalVisible = (id) => {
    setShowModal(true);
    setId(id);
  };
  const modalHidden = () => {
    setShowModal(false);
  };

  console.log(id);
  return (
    <>
      <CacheProvider value={cache}>
        <Navbar />

        {isAuthenticated ? (
          <>
            <div className="wrap">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="search"
              >
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="What are you looking for?"
                  value={search.title}
                  onChange={(event) => {
                    setSearch({ ...search, title: event.target.value });
                  }}
                />
                <button
                  type="submit"
                  onClick={() => getMovies(search.title)}
                  className="searchButton"
                >
                  <FaSistrix className="fa fa-search" />
                </button>
              </form>
            </div>
            <div className="movie-container">
              <div className="whole-container">
                {picture.map((poster, index) => {
                  return (
                    <div key={index} className="poster-container">
                      <img
                        onClick={() => modalVisible(poster._id)}
                        className="poster"
                        src={poster.poster}
                        alt={poster.title}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
                        }}
                      />
                    </div>
                  );
                })}

                <Modal
                  id={id}
                  modalHidden={modalHidden}
                  showModal={showModal}
                  setShowModal={setShowModal}
                ></Modal>
              </div>
              <Stack className="pagination-container" spacing={2}>
                <Pagination
                  color="primary"
                  className="pagination"
                  count={Math.ceil(amount / 60)}
                  page={page}
                  onChange={handleChange}
                  onClick={(e) => e.preventDefault()}
                />
              </Stack>
            </div>
          </>
        ) : (
          <div className="welcome-container">
            <button className="get-started" onClick={() => loginWithPopup()}>
              Get Started
            </button>
          </div>
        )}
      </CacheProvider>
    </>
  );
}

export default Movies;
