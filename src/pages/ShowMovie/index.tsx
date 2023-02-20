import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { getMovie, Movie } from '../../services/movies'
import { createRating, CreateRating, getRatingByUserAndMovie } from '../../services/rating'

export const ShowMovie = () => {
  const [movie, setMovie] = useState<Movie>()
  const [rating, setRating] = useState({
    rating: 0,
    commentTitle: '',
    commentContent: ''
  })
  const { user } = useContext(AuthContext)
  const id = useParams().id

  useEffect(() => {
    const fetchMovie = async (id: string) => {
      try {
        const response = await getMovie(id)
        setMovie(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRating = async (id: string) => {
      try {
        const response = await getRatingByUserAndMovie(user.email, id)
        if (response.data) {
          setRating(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (id) {
      fetchMovie(id)
      user && fetchRating(id)
    }
  }, [])

  const onSubmitRating = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data: CreateRating = {
        ...rating,
        movieId: id!,
        userId: user.email
      }
      const response = await createRating(data)
      setRating({ ...rating, rating: response.data.rating, commentTitle: response.data.commentTitle, commentContent: response.data.commentContent })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>{movie?.title}</h1>
      <video controls autoPlay className="media" src={movie?.videoUrl}
        style={{ height: 170, width: 300 }}
      />
      {/* //   <source src={movie?.videoUrl} /> */}
      {/* // </video> */}
      <p>{movie?.releaseDate}</p>
      <p>{movie?.category}</p>
      <p>{movie?.movieDirector}</p>

      <div>
        <h2>Rating</h2>
        <form onSubmit={onSubmitRating}>
          <label htmlFor="rating">Rating</label>
          <select name="rating" id="rating" value={rating.rating} onChange={(e) => setRating({ ...rating, rating: Number(e.target.value) })}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="commentTitle">Comment Title</label>
          <input type="text" name="commentTitle" id="commentTitle" value={rating.commentTitle} onChange={(e) => setRating({ ...rating, commentTitle: e.target.value })} />
          <label htmlFor="commentContent">Comment Content</label>
          <input type="text" name="commentContent" id="commentContent" value={rating.commentContent} onChange={(e) => setRating({ ...rating, commentContent: e.target.value })} />
          <button type="submit">Submit</button>
        </form>
      </div>
  </div>
  )
}
