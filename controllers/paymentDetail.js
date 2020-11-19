var mysql = require("mysql");
var config = require("../database/database.js");
var error = require("./error.js");
var globals = require('../globlal/globals.js');
var methods = require('../globlal/methods.js');
const request = require("request-promise");

/*let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();*/

module.exports = {

    obtenerPath: function (req, res, next) {
        res.status(200).send({ 'resultado': req.file });
    },
}
