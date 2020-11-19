var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  listarCategorias: function (req, res, next) {

    pool.query('SELECT * FROM categoria WHERE estado = 1', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('category.js', 'listarCategorias', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },
}
