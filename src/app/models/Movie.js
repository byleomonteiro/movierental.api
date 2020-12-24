const conn = require("../../database")

class Movie {
    async create(data) {
        try {
            const { title, director, copy_amount } = data
    
            const db = await conn()
    
            const insertSQL = "INSERT INTO MOVIES (title, director, copy_amount) VALUES (?,?,?);"
            
            const [created] = await db.query(insertSQL, [title, director, copy_amount])
    
            const selectSQL = `SELECT * FROM MOVIES WHERE id=?`
    
            const [[row]] = await db.query(selectSQL, [created.insertId])
    
            return row
        } catch(err){
            throw err
        }
    }

    async findOne(id) {
        try {
            const sql = `SELECT * FROM MOVIES WHERE id=?`;
            
            const db = await conn()
    
            const [[rows]] = await db.query(sql, [id])
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async find(query) {
        try {
            const { title } = query

            let sql = 'SELECT * FROM MOVIES'

            if(title){
                sql = `SELECT * FROM MOVIES WHERE title LIKE '%${title}%'`;
            }

            const db = await conn()
            const [rows] = await db.query(sql)
            
            return rows
        } catch(err){
            throw err;
        }
    }

    async update(id, body) {
        try {
            const keys = Object.keys(body)

            keys.map((key, index) => keys[index] = key + "=?")

            const sql = `UPDATE MOVIES SET ${keys.toString()} WHERE id=?;`;

            const db = await conn()

            const values = Object.values({ ...body, id })

            await db.query(sql, values)

            const rows = await this.findOne(id)
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM MOVIES WHERE id=?`;
            
            const db = await conn()
    
            const [rows] = await db.query(sql, [id])
    
            return rows
        } catch(err){
            throw err;
        }
    }
}

module.exports = new Movie();