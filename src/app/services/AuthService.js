const { sign } = require("../security/JWTSecurity")
const { decrypt } = require("../helpers/encrypt")

class AuthService {
    constructor(model) {
        this.model = model;
    }

    async login(credentials) {
        try {
            const { email, password } = credentials
    
            const user = await this.model.findByEmail(email)

            if(!user){
                return {
                    error: true,
                    statusCode: 401,
                    message: "User invalid"
                }
            }
    
            const match = await decrypt(password, user.password)
    
            if(!match){
                return {
                    error: true,
                    statusCode: 401,
                    message: "Wrong credentials"
                }
            }
    
            const { token } = await sign(user)
    
            return {
                error: false,
                statusCode: 200,
                token
            }
        } catch(err) {
            return {
                error: true,
                statusCode: 500,
                message: err.message
            }
        }
    }
}

module.exports = AuthService