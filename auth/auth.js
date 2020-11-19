const { createHash } = require('crypto');
var jwt = require("jsonwebtoken");

module.exports = {
  encriptar: function (lines) {

    const hash = createHash('sha256');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') continue;
      hash.write(line);
    }
    return hash.digest('base64');
  },

  generar: function (json) {

    var data = {
      idUsuario: json.idUsuario,
      email: json.email,
      contrasena: json.contrasena,
      idPersona: json.idPersona
    }
    var token = jwt.sign(data, "remolkar", {
      expiresIn: 60 * 60 * 24
    });

    return token;
  },

  seguridad: function (req, res, next) {
    var token = req.headers["authorization"];
    if (!token) {
      res.status(500).send({ 'resultado': 5 });
      return;
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, "remolkar", function (err, user) {
      if (err) {
        res.status(500).send({ 'resultado': 5 });
      } else {
        return next();
      }
    });
  }
}