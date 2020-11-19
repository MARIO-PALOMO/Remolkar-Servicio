var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  listarServicios: function (req, res, next) {

    pool.query("SELECT * FROM consultar_producto WHERE tipoNombre = 'SERVICIO'", function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;

        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductos: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto AND stock > 0 AND precio != 0 ', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;

        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductosPaginacion: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto WHERE estado = 1 AND stock > 0 AND precio != 0  ' + req.body.sentencia + ' LIMIT 12 OFFSET ' + req.body.pagina, function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;

        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },



  listarProducto: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto WHERE estado = 1 AND stock > 0 AND precio != 0  AND idProducto = ?', [req.query.idProducto], function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows[0];
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductosDescuentos: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto WHERE estado = 1 AND promocion = 1 AND promocionUnica != 1 AND stock > 0 AND precio != 0  ORDER BY precioDescuento ASC LIMIT 4', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductosDescuentos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductosUltimos: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto WHERE estado = 1 AND stock > 0 AND precio != 0  ORDER BY idProducto DESC LIMIT 3', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductosUltimos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;

        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductoPromocionUnica: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto WHERE estado = 1 AND promocionUnica = 1 LIMIT 1', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductoPromocionUnica', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;

        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductosRelacionados: function (req, res, next) {

    pool.query('SELECT * FROM consultar_producto WHERE estado = 1 AND stock > 0 AND precio != 0  AND idCategoria = ? ORDER BY RAND() LIMIT 4', [req.query.idCategoria], function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;

        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductosRangoPrecios: function (req, res, next) {

    pool.query("SELECT MIN(precio) AS 'minimo', MAX(precio) AS 'maximo' FROM consultar_producto", function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductoPromocionUnica', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },

  listarProductosLlantas: function (req, res, next) {
    pool.query('SELECT * FROM consultar_producto WHERE estado = 1 AND stock > 0 AND precio != 0  AND ' + req.body.sentencia + ' LIMIT 12 OFFSET ' + req.body.pagina, function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarProductos', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows;
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },



  listarDetallesLlanta: function (req, res, next) {

    pool.query("SELECT CONCAT('[',(SELECT DISTINCT GROUP_CONCAT(DISTINCT  CONCAT('\"',ancho,'\"')) FROM consultar_producto),']') AS 'ancho', CONCAT('[',(SELECT DISTINCT GROUP_CONCAT(DISTINCT  CONCAT('\"',perfil,'\"')) FROM consultar_producto),']') AS 'perfil', CONCAT('[',(SELECT DISTINCT GROUP_CONCAT(DISTINCT  CONCAT('\"',rin,'\"')) FROM consultar_producto),']') AS 'rin'", function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('product.js', 'listarDetallesLlanta', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var result = rows[0];
        res.status(200).send({ 'resultado': result });
      }

    });
    //pool.end();
  },
}
