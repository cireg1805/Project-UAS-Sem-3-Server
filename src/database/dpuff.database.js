const mysql = require("mysql2");

const db = mysql.createPool({
  user: "root",
  password: "",
  host: "localhost",
  database: "dpuff_web",
});

module.exports = db.promise();