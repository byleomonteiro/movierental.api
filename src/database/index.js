const mysql = require('mysql2/promise');

const databaseConfig = require("../config/database")

module.exports = async () => {
    const dbConnection = await mysql.createConnection(databaseConfig);
    return dbConnection
}
