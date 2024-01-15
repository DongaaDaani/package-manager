const con = require("../Database/connectToDB");

exports.addItems = (req, res) => {
    const { tableName, data,id } = req.body;

    if (!tableName || !data || typeof data !== "object") {
      return res.status(400).json({ message: "Invalid request body" });
    }
  
    const fields = Object.keys(data);
    const values = Object.values(data);
  
    if (fields.length === 0) {
      return res.status(400).json({ message: "No data provided" });
    }
  
    const placeholders = fields.map(() => "?").join(", ");
    const query = `INSERT INTO ${tableName} (${fields.join(", ")}) VALUES (${placeholders})`;
  
    try {
      con.query(query, values, (err, result) => {
        if (err) {
          // A hiba kezelése
          console.error("Hiba történt:", err);
          return res.status(500).json({ err: err });
        } else {
          if (result.affectedRows > 0) {
            const insertedId = result.insertId; // Az új elem ID-je

            con.query(`SELECT * FROM ${tableName} WHERE ${id} = ?`, [insertedId], (err, rows) => {
              if (err) {
                console.error("Hiba történt:", err);
                return res.status(500).json({ message: "Error retrieving inserted data" });
              } else {
                if (rows.length > 0) {
                  const insertedData = rows[0];
                  return res.json({ message: "Data inserted successfully", insertedData: insertedData , insertedId:insertedId});
                } else {
                  return res.status(500).json({ message: "Data not found after insertion" });
                }
              }
            });
          } else {
            return res.status(500).json({ message: "Insert error!" });
          }
        }
      });
    } catch (error) {
      console.error("Hiba a lekérdezés során:", error);
      return res.status(500).json({ message: "Hiba a lekérdezés során" });
    }
};