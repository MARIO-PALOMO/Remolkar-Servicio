var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  gestionHorario: function (req, res, next) {

    pool.query('SELECT gestion_horario(?,?,?,?,?) AS res',
      [req.body.identificador, req.body.idHorario, req.body.apertura, req.body.cierre, req.body.descripcion], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('schedule.js', 'gestionHorario', JSON.stringify(err));
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

  listarHorarios: function (req, res, next) {

    pool.query('SELECT * FROM horario', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('schedule.js', 'listarHorarios', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        console.log(result);
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
