import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link } from "react-router-dom"

function MovieTile({ movie, addToFavorites }) {

  const thisMovie = {
    id: movie.imdbID,
    title: movie.Title
  }
  return (
    <div className="margin-top-bottom">
    <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={movie.Poster} />
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{movie.Year}</Card.Subtitle>
      <Button variant="light"><Link to ={`/movies/${movie.imdbID}`}>More Info</Link></Button>
      <Button onClick={() => addToFavorites(thisMovie)} variant="light">Add To Favorites</Button>
    </Card.Body>
  </Card>
  </div>
  )
}

export default MovieTile
