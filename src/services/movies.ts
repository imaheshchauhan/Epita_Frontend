import { api } from './api'

export interface CreateMovie {
    title: string;
    releaseDate: string;
    category: string;
    movieDirector: string;
    imageUrl: string;
    videoUrl: string;
}

export interface Movie extends CreateMovie {
    _id: string;
}

export const getMovies = () => api.get('/v1/movies')

export const getMovie = (id: string) => api.get(`/v1/movies/${id}`)

export const createMovie = (movie: CreateMovie) => api.post('/v1/movies', movie)
