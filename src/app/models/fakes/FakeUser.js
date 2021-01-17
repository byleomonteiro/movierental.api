const uuid = require("uuid")

class FakeUser {
    users = []

    async create(data) {
            const { name, email, password } = data

            const now = new Date()
            const user = {
                id: uuid.v4(),
                name,
                email,
                password,
                created_at: now,
                updated_at: now
            }

            this.users.push(user)
    
            return user
    }

    async findOne(id) {
        const user = this.users.find(user => user.id === id)

        return user
    }

    async findByEmail(email) {
        const user = this.users.find(user => user.email === email)

        return user
    }

    async find() {
        return this.users
    }

    async delete(id) {
        const user = this.users.find(user => user.id === id)

        this.users[user] = undefined

        return this.users
    }        
}

module.exports = FakeUser;