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

  listarMarcas: function (req, res, next) {

    pool.query('SELECT * FROM marca_auto', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('vehicle.js', 'listarMarcas', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarModelos: function (req, res, next) {

    pool.query('SELECT * FROM modelo_auto WHERE idMarca = ?', [req.query.idMarca], function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('vehicle.js', 'listarModelos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

}
