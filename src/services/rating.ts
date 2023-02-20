import { api } from './api'

export interface CreateRating {
    movieId: string;
    rating: number;
    commentTitle: string;
    commentContent: string;
    userId: string;
}

export const createRating = (rating: CreateRating) => api.post('/v1/ratings', rating)

export const getRatings = () => api.get('/v1/ratings')

export const getRating = (id: string) => api.get(`/v1/ratings/${id}`)

export const getRatingByUserAndMovie = (userId: string, movieId: string) => api.get(`/v1/ratings/user/${userId}/movie/${movieId}`)
