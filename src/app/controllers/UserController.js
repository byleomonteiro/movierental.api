const User = require("../models/User")
const UserService = require("../services/UserService")

const userService = new UserService()

class UserController {
    constructor() { 
        this.service = userService
    }

    async create(req, res){
        const { name, email, password } = req.body

        const userService = new UserService()

        const response = await userService.insert({ name, email, password })

        return res.status(response.statusCode).json(response)
    }

    async index(req, res){
        const userService = new UserService()
        const response = await userService.getAll()

        return res.status(response.statusCode).json(response)
    }


    async show(req, res){
        const { userId } = req.params

        const userService = new UserService()
        
        const response = await userService.get(userId)

        return res.status(response.statusCode).json(response)
    }


    async delete(req, res) {
        const { userId } = req.params

        const userService = new UserService()

        const response = await userService.delete(userId)

        return res.status(response.statusCode).json()
    }
}

module.exports = new UserController()