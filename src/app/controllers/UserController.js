const UserService = require("../services/UserService")

const userService = new UserService()

class UserController {
    async create(req, res){
        const { name, email, password } = req.body

        const response = await userService.insert({ name, email, password })

        return res.status(response.statusCode).json(response)
    }

    async index(req, res){
        const response = await userService.getAll()

        return res.status(response.statusCode).json(response)
    }

    async delete(req, res) {
        const { userId } = req.params

        const response = await userService.delete(userId)

        return res.status(response.statusCode).json()
    }
}

module.exports = new UserController()