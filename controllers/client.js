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

  gestionCliente: function (req, res, next) {

    pool.query('SELECT gestion_cliente(?,?,?,?,?,?,?,?,?) AS res',
      [req.body.identificador, req.body.idCliente, req.body.tipoIdentificacion, req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, req.body.email, auth.encriptar(req.body.identificacion)], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('client.js', 'gestionCliente', JSON.stringify(err));
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

  listarClientes: function (req, res, next) {

    pool.query('SELECT * FROM consultar_cliente', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('client.js', 'listarClientes', JSON.stringify(err));
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
