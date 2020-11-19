var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");
var auth = require(".././auth/auth.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  gestionEmpleado: function (req, res, next) {

    pool.query('SELECT gestion_empleado(?,?,?,?,?,?,?,?,?) AS res',
      [req.body.identificador, req.body.idEmpleado, req.body.tipoIdentificacion, req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, req.body.email, auth.encriptar(req.body.identificacion)], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('employee.js', 'gestionEmpleado', JSON.stringify(err));
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

  listarEmpleados: function (req, res, next) {

    pool.query('SELECT * FROM consultar_empleado', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('employee.js', 'listarEmpleados', JSON.stringify(err));
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
