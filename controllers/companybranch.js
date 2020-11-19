var mysql = require("mysql");
var config = require("../database/database.js");
var error = require("./error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  gestionSucursal: function (req, res, next) {

    pool.query('SELECT gestion_sucursal(?,?,?,?,?,?,?,?) AS res',
      [req.body.identificador, req.body.idSucursal, req.body.nombre, req.body.telefono, req.body.direccion, req.body.latitud, req.body.longitud, req.body.idEmpresa], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('companybranch.js', 'gestionSucursal', JSON.stringify(err));
          res.status(500).send({ 'resultado': 5 });
        } else {
          var result = rows[0].res;

          if (result == 0) {
            res.status(400).send({ 'resultado': result });
          } else {
            res.status(200).send({ 'resultado': result });
          }
        }

      });
    //pool.end();
  },

  listarSucursales: function (req, res, next) {

    pool.query('SELECT * FROM sucursal', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('companybranch.js', 'listarSucursales', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;

        if (result == 0) {
          res.status(400).send({ 'resultado': result });
        } else {
          res.status(200).send({ 'resultado': result });
        }
      }

    });
    //pool.end();
  },

}
