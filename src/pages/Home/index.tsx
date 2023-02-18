import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovies, Movie } from '../../services/movies'

export const Home = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const response = await getMovies()
        setMovies(response.data)
      }
      fetchMovies()
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const onClickMovie = (movie: Movie) => {
    navigate(`/movies/${movie._id}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Latest Movies</h1>
        {movies.map((movie, index) => (
          <div key={index}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', margin: 10, padding: 10 }}
            onClick={() => onClickMovie(movie)}
            >
            <h2>{movie.title}</h2>
            <img src={movie.imageUrl} alt={movie.title} style={{ height: 150, width: 150 }} />
            <p>{movie.releaseDate}</p>
            <p>{movie.category}</p>
            <p>{movie.movieDirector}</p>
          </div>
        ))}
    </div>
  )
}
