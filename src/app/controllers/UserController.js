const User = require("../models/User")
const UserService = require("../services/UserService")

const model = new User()
const service = new UserService(model)

class UserController {
  
    async create(req, res){
        const { name, email, password } = req.body

        const response = await service.insert({ name, email, password })

        return res.status(response.statusCode).json(response)
    }

    async index(req, res){
        const response = await service.getAll()

        return res.status(response.statusCode).json(response)
    }

    async delete(req, res) {
        const { userId } = req.params

        const response = await service.delete(userId)

        return res.status(response.statusCode).json(response)
    }
}

module.exports = new UserController()