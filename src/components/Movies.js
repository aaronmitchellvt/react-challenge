import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieTile from "./MovieTile";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrash } from "react-icons/fa";

function Movies() {
  const navigate = useNavigate();
  const getFavoriteMovies = () => {
    const storedValues = localStorage.getItem("movie-favorites");
    if (!storedValues) return [];
    return JSON.parse(storedValues);
  };

  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState(getFavoriteMovies);

  const getMovieData = async () => {
    const validTitle = movieTitle.split(" ").join("+");
    console.log("Valid title: ", validTitle);
    const url = `http://www.omdbapi.com/?s=${validTitle}&type=movie&apikey=<your api key>`;
    const response = await axios.get(url);
    const moviesData = response.data.Search;

    const movieTiles = moviesData.map((movie) => {
      let isFavorited = false;
      if (favoriteMovies.some((favMovie) => favMovie.id === movie.imdbID)) {
        isFavorited = true;
      }
      return (
        <Col col sm={12} md={6} lg={4}>
          <MovieTile
            addToFavorites={addToFavorites}
            movie={movie}
            isFavorited={isFavorited}
          />
        </Col>
      );
    });
    setMovies([...movies, movieTiles]);
    console.log("Movies", movies);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getMovieData();
    setMovieTitle("");
  };

  const onNavigate = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const addToFavorites = (newFavorite) => {
    console.log("New favorite: ", newFavorite);
    setFavoriteMovies((favoriteMovies) => favoriteMovies.concat(newFavorite));
  };

  const deleteFavMovie = (movieId) => {
    setFavoriteMovies(favoriteMovies.filter((movie) => movieId !== movie.id));
    localStorage.setItem("movie-favorites", JSON.stringify(favoriteMovies));
  };

  useEffect(() => {
    localStorage.setItem("movie-favorites", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <div>
      <Container>
        <h1 className="center-text top-margin">Look up Movies!</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3 inline-form" controlId="formBasicEmail">
            <Form.Label>Enter a movie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Guardians of the Galaxy"
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
          <Row>{movies}</Row>
        </Container>
      </section>

      {favoriteMovies.length > 0 ? (
        <Container>
          <h2 className="center-text">Favorite Movies</h2>
          <Row>
            {favoriteMovies.map((fav) => (
              <Col col sm={12} md={6} lg={4}>
                <Card className="margin-top-bottom">
                  <Card.Body>
                    <Card.Title>{fav.title}</Card.Title>
                    <Card.Link
                      onClick={() => {
                        deleteFavMovie(fav.id);
                      }}
                    >
                      <FaTrash />
                    </Card.Link>
                    <Card.Link
                      onClick={() => {
                        onNavigate(fav.id);
                      }}
                    >
                      <FaArrowRight />
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <h4 className="center-text">No Favorite Movies</h4>
      )}
    </div>
  );
}

export default Movies;
