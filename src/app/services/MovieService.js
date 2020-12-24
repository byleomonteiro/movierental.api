const Movie = require("../models/Movie")

class MovieService {
    async insert(data){
        
        try {
            const { title, director, copy_amount } = data

            const movie = await Movie.create({ title, director, copy_amount })

            return {
                error: false,
                statusCode: 201,
                data: movie
            }
        } catch(err){
            return {
                error: true,
                statusCode: 500,
                message: err.message
            }
        }
    }

    async get(id){
        try {
            const movie = await Movie.findOne(id)

            return {
                error: false,
                statusCode: 200,
                data: movie
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
            const movies = await Movie.find()
    
            return {
                error: false,
                statusCode: 200,
                data: movies
            }
        } catch(err){
            return {
                error: true,
                statusCode: 500,
                message: err.message
            }
        }
    }

    async delete(id){
        try {
            await Movie.delete(id)

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

module.exports = MovieService