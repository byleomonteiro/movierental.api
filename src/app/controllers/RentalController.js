const RentalService = require("../services/RentalService")

const rentalService = new RentalService()

class RentalController {
    async create(req, res) {
        const { id: user_id } = req.currentUser
        const { movieId: movie_id } = req.params

        const response = await rentalService.insert({ user_id, movie_id })

        return res.status(response.statusCode).json(response)
    }

    async index(req, res){
        const response = await rentalService.getAll(req.query)

        return res.status(response.statusCode).json(response)
    }

    async update(req, res){
        const { id: user_id } = req.currentUser
        const { movieId: movie_id } = req.params

        const response = await rentalService.update({ user_id, movie_id })

        return res.status(response.statusCode).json(response)
    }
}

module.exports = new RentalController()