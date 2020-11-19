var mysql = require("mysql");
var config = require(".././database/database.js");
var auth = require(".././auth/auth.js");
var error = require(".././controllers/error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  registroUsuario: function (req, res, next) {

    pool.query('SELECT gestion_registro_usuario(?,?,?,?,?,?,?,?,?) AS res',
      [req.body.email, auth.encriptar(req.body.contrasena), req.body.rol, req.body.tipoIdentificacion, req.body.identificacion, req.body.nombre, req.body.telefono, req.body.direccion, req.body.tipo], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('user.js', 'registroUsuario', JSON.stringify(err));
          res.status(500).send({ 'resultado': 5 });
        } else {
          var result = rows[0].res;

          if (result == 0) {
            res.status(200).send({ 'resultado': result });
          } else {
            res.status(200).send({ 'resultado': result });
          }
        }

      });
    //pool.end();
  },

  iniciarSesion: function (req, res, next) {

    pool.query('CALL gestion_autenticacion(?,?)',
      [req.body.email, auth.encriptar(req.body.contrasena)], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('user.js', 'iniciarSesion', JSON.stringify(err));
          res.status(500).send({ 'resultado': 5 });
        } else {
          var result = rows[0];
          if (result == undefined) {
            res.status(200).send({ 'resultado': null });
          } else {
            res.status(200).send({ 'resultado': result[0], 'token': auth.generar(result[0]) });
          }
        }

      });
    //pool.end();
  },
}
