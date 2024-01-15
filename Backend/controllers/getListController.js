const con = require("../Database/connectToDB");

exports.getList = async (req, res) => {
  try {
    const { tables, joins, conditions, selectedColumns } = req.body;

    // Ellenőrizzük, hogy a kérés tartalmazza-e a szükséges adatokat
    if (!tables || !joins || !conditions) {
      return res.status(400).json({ message: "Invalid request parameters." });
    }

    // Elkészítjük a SQL lekérdezést a joinokkal és feltételekkel
    let sql = `SELECT ${selectedColumns.join(', ')} FROM ${tables[0]}`;

    // Hozzáadjuk a joinokat
    for (let i = 1; i < tables.length; i++) {
      sql += ` LEFT JOIN ${tables[i]} ON ${joins[i - 1]}`;
    }


    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    // Futtatjuk a lekérdezést
    const result = await executeQuery(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Az executeQuery függvény meghívja a MySQL lekérdezést
const executeQuery = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
