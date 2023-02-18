import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMovie, CreateMovie } from '../../services/movies'

function initialFormValues (): CreateMovie {
  return {
    title: '',
    releaseDate: '',
    category: '',
    movieDirector: '',
    imageUrl: '',
    videoUrl: ''
  }
}

export function AddMovie () {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialFormValues)
  const [addMovieRequestStatus, setAddMovieRequestStatus] = useState('success')

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    setAddMovieRequestStatus('loading')

    await createMovie(values)

    setAddMovieRequestStatus('success')

    if (addMovieRequestStatus === 'success') {
      setValues(initialFormValues)
      navigate('/')
    }
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setAddMovieRequestStatus('success')
  }, [])

  return (
        <div>
            <form
                noValidate
                data-testid="add-movie-form"
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        value={values.title}
                        type="text"
                        name="title"
                        id="title"
                        data-testid="add-movie-input-title"
                        disabled={addMovieRequestStatus === 'loading'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="releaseDate">Release Date</label>
                    <input
                        value={values.releaseDate}
                        type="text"
                        name="releaseDate"
                        id="releaseDate"
                        data-testid="add-movie-input-releaseDate"
                        disabled={addMovieRequestStatus === 'loading'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        value={values.category}
                        type="text"
                        name="category"
                        id="category"
                        data-testid="add-movie-input-category"
                        disabled={addMovieRequestStatus === 'loading'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="movieDirector">Movie Director</label>
                    <input
                        value={values.movieDirector}
                        type="text"
                        name="movieDirector"
                        id="movieDirector"
                        data-testid="add-movie-input-movieDirector"
                        disabled={addMovieRequestStatus === 'loading'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image Url</label>
                    <input
                        value={values.imageUrl}
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        data-testid="add-movie-input-imageUrl"
                        disabled={addMovieRequestStatus === 'loading'}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="videoUrl">Video Url</label>
                    <input
                        value={values.videoUrl}
                        type="text"
                        name="videoUrl"
                        id="videoUrl"
                        data-testid="add-movie-input-videoUrl"
                        disabled={addMovieRequestStatus === 'loading'}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    data-testid="add-movie-button"
                    disabled={addMovieRequestStatus === 'loading'}
                >
                    Add Movie
                </button>
            </form>
      </div>
  )
}
