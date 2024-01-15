const con = require("../Database/connectToDB");

exports.updateItem = (req, res) => {
    const { tableName, updates, whereClause } = req.body;
  
    if (!tableName || !updates) {
      return res.status(400).json({ message: 'Hiányzó adatok' });
    }
  
    let updateQuery = `UPDATE ${tableName} SET ?`;
    const whereValues = []; 

    if (whereClause) {
      updateQuery += ' WHERE ' + whereClause.condition;
      whereValues.push(whereClause.value);
    }
  
    con.query(updateQuery, [updates, ...whereValues], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Hiba történt az adatok frissítése közben' });
      }
  
      res.json({ message: 'Az adatok frissítése sikeres volt' });
    });
};