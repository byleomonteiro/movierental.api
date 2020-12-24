const mysql = require('mysql2/promise');

const databaseConfig = require("../config/database")

module.exports = async () => {
    const connection = await mysql.createConnection(databaseConfig);
    return connection
}
