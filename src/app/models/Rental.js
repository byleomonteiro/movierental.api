const conn = require("../../database")

class Movie {
    async create(data) {
        try {
            const { title, director, copy_amount } = data
    
            const db = await conn()
    
            const insertSQL = "INSERT INTO MOVIES (title, director, copy_amount) VALUES (?,?,?);"
            
            const [created] = await db.query(insertSQL, [title, director, copy_amount])
    
            const selectSQL = `SELECT * FROM MOVIES WHERE id = ${created.insertId}`
    
            const [row] = await db.query((selectSQL))
    
            return row
        } catch(err){
            throw err
        }
    }

    async findOne(id) {
        try {
            const sql = `SELECT * FROM MOVIES where id = ${id}`;
            
            const db = await conn()
    
            const [rows] = await db.query(sql)
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async find() {
        try {
            const sql = 'SELECT * FROM MOVIES';
            
            const db = await conn()
    
            const [rows] = await db.query(sql)
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM MOVIES WHERE id = ${id}`;
            
            const db = await conn()
    
            const [rows] = await db.query(sql)
    
            return rows
        } catch(err){
            throw err;
        }
    }
}

module.exports = new Movie();