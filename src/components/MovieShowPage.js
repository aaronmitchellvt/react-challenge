import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

function MovieShowPage(props) {
  const { id } = useParams();

  const [movieData, setMovieData] = useState({
    title: "",
    director: "",
    poster: "",
    releaseYear: "",
    runtime: "",
    genre: "",
    plot: "",
    ratings: [],
    awards: "",
  });

  const getMovieData = async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=<your api key>`
    );
    setMovieData({
      title: response.data.Title,
      director: response.data.Director,
      poster: response.data.Poster,
      releaseYear: response.data.Released,
      runtime: response.data.Runtime,
      genre: response.data.Genre,
      plot: response.data.Plot,
      ratings: response.data.Ratings,
      awards: response.data.Awards,
    });
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div className="top-margin">
      <Container>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <h1 className="center-text">{movieData.title}</h1>
            <img className="center" src={movieData.poster} alt="movie poster" />
            <p className="center-text">
              <b>Directed by</b> {movieData.director}
            </p>
            <p className="center-text">
              <b>Length</b> {movieData.runtime}
            </p>
            <p className="center-text">
              <b>Genre</b> {movieData.genre}
            </p>
          </Col>

          <Col sm={12} md={6} lg={6}>
            <h1 className="center-text">Plot</h1>
            <p className="center-text"> {movieData.plot}</p>
            <hr />

            <h1 className="center-text">Movie Stats</h1>
            <h4 className="center-text">Ratings</h4>
            {movieData.ratings.map((rating) => (
              <p key={rating.Value} className="center-text">
                {rating.Value} - {rating.Source}
              </p>
            ))}
            <h4 className="center-text">Awards</h4>
            <p className="center-text">{movieData.awards}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MovieShowPage;
