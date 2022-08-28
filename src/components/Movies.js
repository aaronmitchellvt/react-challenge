import { Button, Form, Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieTile from "./MovieTile";

function Movies() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getMovieData = async () => {
    const validTitle = movieTitle.split(" ").join("+");
    console.log("Valid title: ", validTitle);
    const url = `http://www.omdbapi.com/?s=${validTitle}&type=movie&apikey=<your_API_Key>`;
    const response = await axios.get(url);
    const moviesData = response.data.Search;

    const movieTiles = moviesData.map((movie) => {
      return <MovieTile addToFavorites={addToFavorites} movie={movie} />;
    });
    setMovies([...movies, movieTiles]);
    console.log("Movies", movies);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getMovieData();
    setMovieTitle("");
  };

  const addToFavorites = (newFavorite) => {
    console.log("Add to fav called");
    const favFromStorage = JSON.parse(localStorage.getItem("my-favorites"));
    favFromStorage.push(JSON.stringify(newFavorite));
  };

  useEffect(() => {
    if (favoriteMovies.length) {
      const favMovies = JSON.parse(localStorage.getItem("my-favorites"));
      if (favMovies) {
        setFavoriteMovies(favMovies);
      }
    }
  }, []);

  useEffect(() => {
    console.log(movies);
    localStorage.setItem("my-favorites", JSON.stringify(favoriteMovies));
  });

  return (
    <div>
      <Container>
        <h1 className="center-text top-margin">Look up Movies!</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3 inline-form" controlId="formBasicEmail">
            <Form.Label>Enter a movie</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={movieTitle}
              onChange={(e) => {
                setMovieTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Button className="center-btn" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>

      <hr />

      <section>
        <Container>
          <Row>
            {movies.map((tile, i) => (
              <Col col sm={12} md={6} lg={4} key={i}>
                {tile}
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {favoriteMovies.length > 0 ? (
        <div>
          {favoriteMovies.map((fav) => (
            <h3>{fav.title}</h3>
          ))}
        </div>
      ) : (
        <h3 className="center-text">No Favorite Movies</h3>
      )}
    </div>
  );
}

export default Movies;
