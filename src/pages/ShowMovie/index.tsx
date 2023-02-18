import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie, Movie } from '../../services/movies'

export const ShowMovie = () => {
  const [movie, setMovie] = useState<Movie>()
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
    if (id) {
      fetchMovie(id)
    }
  }, [])

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
  </div>
  )
}
