var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  gestionFormaPago: function (req, res, next) {

    pool.query('SELECT gestion_forma_pago(?,?,?,?,?) AS res',
      [req.body.identificador, req.body.idFormaPago, req.body.tipo, req.body.nombre, req.file.path], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('paymentmethod.js', 'gestionFormaPago', JSON.stringify(err));
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

  listarFormasPago: function (req, res, next) {

    pool.query('SELECT * FROM forma_pago', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('paymentmethod.js', 'listarFormasPago', JSON.stringify(err));
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
