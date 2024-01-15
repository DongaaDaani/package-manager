const mysql = require("mysql");
const dbConfig = require("./dbConfig");

const con = mysql.createConnection(dbConfig);

con.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
  console.log("Connected to database");
});

module.exports = con;