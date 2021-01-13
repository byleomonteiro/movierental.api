const { encrypt } = require("../helpers/encrypt")

class UserService {
    constructor(model) {
        this.model = model
    }

    async insert(data){
        try {
            const { name, email, password } = data

            const userExists = await this.model.findByEmail(email)

            if(userExists){
                return {
                    error: true,
                    statusCode: 400,
                    message: "User already exists"
                }
            }

            const hash = await encrypt(password)

            const user = await this.model.create({ name, email, password: hash })

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
            const users = await this.model.find()

            if(!users.length){
                return {
                    error: true,
                    statusCode: 404,
                    message: 'No user found'
                }
            }

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
            const found = await this.model.findOne(id)

            if(!found){
                return {
                    error: true,
                    statusCode: 404,
                    message: 'User not found'
                }
            }

            await this.model.delete(id)

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