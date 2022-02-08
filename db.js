const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "123456",
    database: "ace_crud_exam_database",
    host: "localhost",
    port: 5432
})

module.exports = pool;