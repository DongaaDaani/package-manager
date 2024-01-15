const con = require("./connectToDB");

process.on("SIGINT", () => {
  con.end((err) => {
    if (err) {
      return console.error("Error closing the database connection:", err.message);
    }
    console.log("Database connection closed.");
    process.exit(0);
  });
});

module.exports = con;
