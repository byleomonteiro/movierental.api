const User = require("../models/User")
const { encrypt } = require("../helpers/encrypt")

class UserService {
    async insert(data){
        try {
            const { name, email, password } = data

            const userExists = await User.findByEmail(email)

            if(userExists){
                return {
                    error: true,
                    statusCode: 400,
                    message: "User already exists"
                }
            }

            const hash = await encrypt(password)

            const user = await User.create({ name, email, password: hash })

            return {
                error: false,
                statusCode: 201,
                data: user
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
            const users = await User.find()
    
            return {
                error: false,
                statusCode: 200,
                data: users
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
            await User.delete(id)

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

module.exports = UserService