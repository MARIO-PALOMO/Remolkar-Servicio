var mysql = require("mysql");
var config = require(".././database/database.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  guardarError: function (clase, metodo, error) {
    pool.query('SELECT gestion_error(?,?,?) AS res',
      [clase, metodo, error], function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          var result = rows[0].res;
          return result;
        }

      });
    //pool.end();
  },
}
