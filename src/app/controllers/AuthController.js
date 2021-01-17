const User = require("../models/User")
const AuthService = require("../services/AuthService")

const model = new User()
const service = new AuthService(model)

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const response = await service.login({ email, password })

        return res.status(response.statusCode).json(response)
    }
}

module.exports = new AuthController()