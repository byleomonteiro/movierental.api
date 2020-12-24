const AuthService = require("../services/AuthService")

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const authService = new AuthService()

        const response = await authService.login({ email, password })

        return res.status(response.statusCode).json(response)
    }
}

module.exports = new AuthController()