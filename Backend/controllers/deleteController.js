const con = require("../Database/connectToDB");

exports.deleteItems = (req, res) => {
  try {
    const tableName = req.body.tableName;
    const conditions = req.body.conditions;
    const logicalOperator = req.body.logicalOperator || "AND"; 

    if (!tableName || !conditions || conditions.length === 0) {
      return res.status(400).json({ message: "Hiányzó tábla név vagy feltételek." });
    }

    let deleteQuery = `DELETE FROM ${tableName} WHERE `;

    conditions.forEach((condition, index) => {
      const keys = Object.keys(condition);
      keys.forEach((key, subIndex) => {
        deleteQuery += `${key} = ?`;
        if (subIndex < keys.length - 1) {
          deleteQuery += ` ${logicalOperator} `;
        }
      });

      if (index < conditions.length - 1) {
        deleteQuery += ` ${logicalOperator} `;
      }
    });

    const values = conditions.flatMap((condition) => Object.values(condition));

    con.query(deleteQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Hiba történt a törlés során.", error: err });
      }

      res.status(200).json({ message: "Sikeres törlés.", result });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hiba történt a törlés során.", error: error });
  }
};