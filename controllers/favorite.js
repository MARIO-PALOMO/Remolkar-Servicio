var mysql = require("mysql");
var config = require("../database/database.js");
var error = require("./error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  gestionFavorito: function (req, res, next) {

    pool.query('SELECT gestion_favorito(?,?) AS res',
      [req.body.identificador, req.body.idProducto], function (err, rows, fields) {
        if (err) {
          console.log(err);
          error.guardarError('favorite.js', 'gestionFavorito', JSON.stringify(err));
          res.status(500).send({ 'resultado': 5 });
        } else {
          var result = rows[0].res;
          res.status(200).send({ 'resultado': result });
        }

      });
    //pool.end();
  },

  listarFavoritosProductos: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto_favorito LIMIT 3', [req.query.idProducto], function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('favorite.js', 'listarFavoritosProductos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },
}
