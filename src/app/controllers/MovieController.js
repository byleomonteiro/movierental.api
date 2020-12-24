const MovieService = require("../services/MovieService")

class MovieController {
    async create(req, res){
        const { title, director, copy_amount } = req.body

        const movieService = new MovieService()

        const response = await movieService.insert({ title, director, copy_amount })

        return res.status(response.statusCode).json(response)
    }

    async index(req, res){
        const movieService = new MovieService()
        const response = await movieService.getAll()

        return res.status(response.statusCode).json(response)
    }


    async show(req, res){
        const { movieId } = req.params

        const movieService = new MovieService()
        
        const response = await movieService.get(movieId)

        return res.status(response.statusCode).json(response)
    }


    async delete(req, res) {
        const { movieId } = req.params

        const movieService = new MovieService()

        const response = await movieService.delete(movieId)

        return res.status(response.statusCode).json()
    }
}

module.exports = new MovieController()