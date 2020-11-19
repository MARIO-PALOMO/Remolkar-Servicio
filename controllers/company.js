var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  gestionEmpresa: function (req, res, next) {

    pool.query('SELECT gestion_empresa(?,?,?,?,?,?,?,?) AS res',
      [req.body.identificador, req.body.idEmpresa, req.body.tipoIdentificacion, req.body.identificacion, req.body.nombre, req.body.email, req.file.path, req.body.idHorario], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('company.js', 'gestionEmpresa', JSON.stringify(err));
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

  listarEmpresa: function (req, res, next) {

    pool.query('SELECT * FROM consultar_empresa LIMIT 1', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('company.js', 'listarEmpresa', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows[0];
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

}
