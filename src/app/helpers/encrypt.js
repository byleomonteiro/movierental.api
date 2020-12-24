const bcrypt = require("bcrypt")

module.exports = {
    encrypt: async (password) => {
        return await bcrypt.hash(password, Number(process.env.SALT))
    },
    decrypt: async (password, hash) => {
        return await bcrypt.compare(password, hash)
    }
}