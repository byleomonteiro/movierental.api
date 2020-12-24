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

    async findByUserAndMovieId({ user_id, movie_id }) {
        try {
            const sql = `SELECT * FROM RENTALS WHERE user_id=? AND movie_id=?`;
            
            const db = await conn()
    
            const [[rows]] = await db.query(sql, [user_id, movie_id])
    
            return rows
        } catch(err){
            throw err;
        }
    }

    async find(query) {
        try {
            const { user_id } = query
            
            const db = await conn()

            let sql = 'SELECT * FROM RENTALS\
                INNER JOIN USERS ON RENTALS.user_id = USERS.id\
                INNER JOIN MOVIES ON RENTALS.movie_id = MOVIES.id';

            if(user_id){
                sql += ` WHERE user_id=${user_id}`
            }

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