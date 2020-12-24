const Movie = require("../models/Movie")
const Rental = require("../models/Rental")

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

            const movieRented = await Rental.findByUserAndMovieId({ user_id, movie_id })

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
                    message: "This movie is not available to rent"
                }
            }

            await Rental.create({ user_id, movie_id })

            const copy_amount = movie.copy_amount - 1

            await Movie.update(movie.id, { copy_amount })

            return {
                error: false,
                statusCode: 201,
                message: "Movie rented successfully"
            }
        } catch(err){
            return {
                error: true,
                statusCode: 500,
                message: err.message
            }
        }
    }

    async getAll(query){
        try {
            const rentals = await Rental.find(query)

            if(!rentals.length){
                return {
                    error: true,
                    statusCode: 404,
                    message: "No rental was found"
                }
            }
    
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

    async update(data){
        try {
            const { user_id, movie_id } = data

            const rental = await Rental.findByUserAndMovieId({ user_id, movie_id })

            if(!rental){
                return {
                    error: true,
                    statusCode: 404,
                    message: "You did not rent this movie yet"
                }
            }

            await Rental.delete(rental.id)

            const movie = await Movie.findOne(movie_id)

            const copy_amount = movie.copy_amount + 1

            await Movie.update(movie_id, { copy_amount })

            return {
                error: false,
                statusCode: 200,
                message: "Movie returned successfully"
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