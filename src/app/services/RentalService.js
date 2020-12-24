const Movie = require("../models/Movie")
const Rental = require("../models/Rental")
const MovieService = require("./MovieService")

class RentalService {
    async insert(data) {
        try {
            const { user_id, movie_id } = data

            const movie = await Movie.findOne(movie_id)

            if(!movie){
                return {
                    error: true,
                    statusCode: 404,
                    message: "Movie not exists"
                }
            }

            const movieRented = await Rental.findByMovieId(movie_id)

            if(movieRented){
                return {
                    error: true,
                    statusCode: 400,
                    message: "Movie already rented by you"
                }
            }

            if(movie.copy_amount == 0){
                return {
                    error: true,
                    statusCode: 400,
                    message: "No movies available currently"
                }
            }

            const rental = await Rental.create({ user_id, movie_id })

            const copy_amount = movie.copy_amount - 1

            await Movie.update(movie.id, { copy_amount })

            return {
                error: false,
                statusCode: 201,
                data: rental
            }
        } catch(err){
            return {
                error: true,
                statusCode: 500,
                message: err.message
            }
        }
    }

    async getAll(){
        try {
            const rentals = await Rental.find()
    
            return {
                error: false,
                statusCode: 200,
                data: rentals
            }
        } catch(err){
            return {
                error: true,
                statusCode: 500,
                message: err.message
            }
        }
    }

    async update(id){
        try {
            const rentals = await Rental.findByMovieId(id)

            if(!rentals){
                return {
                    error: true,
                    statusCode: 404,
                    message: "You did not rent this movie"
                }
            }

            await Rental.delete(id)

            const movie = await Movie.findOne(id)

            const copy_amount = movie.copy_amount + 1

            await Movie.update(id, { copy_amount })

            return {
                error: false,
                statusCode: 204,
            }
        } catch(err){
            return {
                error: true,
                statusCode: 500,
                message: err.message
            }
        }

    }
}

module.exports = RentalService