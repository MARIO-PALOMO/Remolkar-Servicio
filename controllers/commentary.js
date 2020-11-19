var mysql = require("mysql");
var config = require("../database/database.js");
var error = require("./error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  gestionComentario: function (req, res, next) {

    pool.query('SELECT gestion_comentario(?,?,?,?,?,?,?) AS res',
      [req.body.identificador, req.body.idComentario, req.body.comentario, req.body.idProducto, req.body.idUsuario, req.body.nombreUsuario, req.body.calificacion], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('commentary.js', 'gestionComentario', JSON.stringify(err));
          res.status(500).send({ 'resultado': 5 });
        } else {
          var result = rows[0].res;
          res.status(200).send({ 'resultado': result });
        }

      });
    //pool.end();
  },

  listarComentariosProducto: function (req, res, next) {

    pool.query('SELECT comentario.* FROM producto INNER JOIN comentario ON producto.idProducto = comentario.idProducto WHERE comentario.idProducto = ?', [req.query.idProducto], function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('commentary.js', 'listarComentariosProducto', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },
}
