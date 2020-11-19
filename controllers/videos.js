var mysql = require("mysql");
var config = require(".././database/database.js");
var error = require(".././controllers/error.js");

let pool;
const createPool = async () => {
  pool = await mysql.createPool(config);
};

createPool();

module.exports = {

  listarVideos: function (req, res, next) {

    pool.query('SELECT * FROM video', function (err, rows, fields) {
      if (err) {
        console.log(err);
        error.guardarError('video.js', 'listarVideos', JSON.stringify(err));
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
