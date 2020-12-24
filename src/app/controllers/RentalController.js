const RentalService = require("../services/RentalService")

class RentalController {
    async create(req, res) {
        const { id: user_id } = req.currentUser
        const { movieId: movie_id } = req.params

        const rentalService = new RentalService()

        const response = await rentalService.insert({ user_id, movie_id })

        return res.status(response.statusCode).json(response)
    }

    async index(req, res){
        const rentalService = new RentalService()
        const response = await rentalService.getAll()

        return res.status(response.statusCode).json(response)
    }

    async update(req, res){
        const { movieId } = req.params

        const rentalService = new RentalService()
        const response = await rentalService.update(movieId)

        return res.status(response.statusCode).json(response)
    }
}

module.exports = new RentalController()