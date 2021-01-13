const conn = require("../../database")

class User {
    async create(data) {
        try {
            const { name, email, password } = data
    
            const db = await conn()
    
            const insertSQL = "INSERT INTO USERS (name, email, password) VALUES (?,?,?);"
            
            const [created] = await db.query(insertSQL, [name, email, password])
    
            const selectSQL = `SELECT * FROM USERS WHERE id = ${created.insertId}`
    
            const [[row]] = await db.query((selectSQL))
    
            return row
        } catch(err){
            throw err
        }
    }

    async findOne(id) {
        try {
            const sql = `SELECT * FROM USERS where id = ${id}`;
            
            const db = await conn()
    
            const [[rows]] = await db.query(sql)
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async findByEmail(email) {
        try {
            const sql = `SELECT * FROM USERS where email = '${email}'`;
            
            const db = await conn()
    
            const [[rows]] = await db.query(sql)

            return rows
        } catch(err){
            throw err;
        }
    }

    async find() {
        try {
            const sql = 'SELECT * FROM USERS';
            
            const db = await conn()
    
            const [rows] = await db.query(sql)
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM USERS WHERE id = ${id}`;
            
            const db = await conn()
    
            const [rows] = await db.query(sql)
    
            return rows
        } catch(err){
            throw err;
        }
    }
}

module.exports = User;