require("dotenv").config();



module.exports = {
    MYSQL_PASSWORD : process.env.MYSQL_PASSWORD,
    MYSQL_USER : process.env.MYSQL_USER,
    MYSQL_HOST : process.env.MYSQL_HOST,
    MYSQL_DATABASE : process.env.MYSQL_DATABASE,
    PG_HOST : process.env.PG_HOST,
    PG_USER : process.env.PG_USER,
    PG_PORT : process.env.PG_PORT,
    PG_PASSWORD : process.env.PG_PASSWORD,
    PG_DATABASE : process.env.PG_DATABASE
}