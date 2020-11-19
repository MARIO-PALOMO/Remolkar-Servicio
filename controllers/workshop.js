var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");
const { query } = require("express");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  listarTalleres: function (req, res, next) {

    pool.query('SELECT * FROM taller', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('workshop.js', 'listarTalleres', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

}
