var mysql = require("mysql");
var config = require("../database/database.js");
var error = require("./error.js");
var globals = require('../globlal/globals.js');
var methods = require('../globlal/methods.js');
const request = require("request-promise");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  obtenerChekoutId: function (req, res, next) {

    pool.query('SELECT * FROM credenciales WHERE modo = ? AND identificador = ?', [globals.entorno, 'DATAFAST-1'], function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('payment.js', 'obtenerChekoutId', JSON.stringify(err));
        res.status(500).send({ 'resultado': 5 });
      } else {
        var credentials = rows[0];

        var mode = (globals.entorno == 'PRODUCCION' ? '' : '');
        var body =
          "entityId=" + credentials.entityId + "" +
          "&amount=" + req.body.total + "" +
          "&currency=USD" +
          "&paymentType=DB" +
          "&customer.givenName=" + req.body.primerNombre + "" +
          "&customer.middleName=" + req.body.segundoNombre + "" +
          "&customer.surname=" + req.body.apellido + "" +
          "&customer.ip=" + methods.generarIp() + "" +
          "&customer.merchantCustomerId=" + req.body.idCliente + "" +
          "&merchantTransactionId=" + req.body.idTransaccion + "" +
          "&customer.email=" + req.body.email + "" +
          "&customer.identificationDocType=IDCARD" +
          "&customer.identificationDocId=" + req.body.identificacion + "" +
          "&customParameters[" + credentials.mid + "_" + credentials.tid + "]=" + methods.generacionParametroPersonalizado(req.body.iva, req.body.subtotal, "0.00") + "" +
          "&cart.items['0'].name=" + req.body.nombreProducto + "" +
          "&cart.items['0'].description=" + req.body.nombreProducto + "" +
          "&cart.items['0'].price=" + req.body.total + "" +
          "&cart.items['0'].quantity=1" +
          mode +
          "&risk.parameters[USER_DATA2]=" + credentials.userData + "";


        var options = {
          method: 'POST',
          uri: credentials.url + "v1/checkouts",
          headers: {
            'Authorization': "Bearer " + credentials.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body,
          json: true
        };

        request(options).then(function (res_) {
          res.status(200).send({ 'resultado': res_ });
        }).catch(function (err) {
          error.guardarError('payment.js', 'obtenerChekoutId', JSON.stringify(err));
          res.status(500).send({ 'resultado': err });
        });

      }

    });
  },

  listarFavoritosProductos: function (req, res, next) {


  },
}
