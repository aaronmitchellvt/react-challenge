import React, { useState } from 'react'
import {Card, Button} from 'react-bootstrap'
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MovieTile({ movie, addToFavorites, isFavorited }) {
  const navigate = useNavigate()
  const [inFavs, setInFavs] = useState(isFavorited)

  const onNavigate = () => {
    navigate(`/movies/${movie.imdbID}`)
  }

  const thisMovie = {
    id: movie.imdbID,
    title: movie.Title
  }

  const onFavorite = () => {
    addToFavorites(thisMovie)
    setInFavs(!inFavs)
  }
  
  return (
    <div className="margin-top-bottom">
    <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={movie.Poster} />
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{movie.Year}</Card.Subtitle>
      <Button variant="primary" onClick={onNavigate}>More Info</Button>{ ' ' }
      {!inFavs && (<Card.Link className="margin-left" onClick={onFavorite}> <FaRegHeart/> </Card.Link>)}
    </Card.Body>
  </Card>
  </div>
  )
}

export default MovieTile
