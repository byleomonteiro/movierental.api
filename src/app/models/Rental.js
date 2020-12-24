const conn = require("../../database")

class Rental {
    async create(data) {
        try {
            const { user_id, movie_id } = data
            
            const db = await conn()
    
            const insertSQL = "INSERT INTO RENTALS (`user_id`, `movie_id`) VALUES (?,?);"

            const [created] = await db.query(insertSQL, [user_id, movie_id])

            const selectSQL = `SELECT * FROM RENTALS WHERE id = ${created.insertId}`
    
            const [[row]] = await db.query((selectSQL))
    
            return row
        } catch(err){
            throw err
        }
    }

    async findByMovieId(id) {
        try {
            const sql = `SELECT * FROM RENTALS WHERE movie_id=?`;
            
            const db = await conn()
    
            const [[rows]] = await db.query(sql, [id])
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async find() {
        try {
            const sql = 'SELECT * FROM RENTALS';
            
            const db = await conn()
    
            const [rows] = await db.query(sql)
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM RENTALS WHERE id=?`;
            
            const db = await conn()
    
            const [rows] = await db.query(sql, [id])
    
            return rows
        } catch(err){
            throw err;
        }
    }
}

module.exports = new Rental();