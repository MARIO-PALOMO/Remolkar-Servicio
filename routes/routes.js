var express = require('express');
var router = express.Router();
var controller = require('.././controllers');
var auth = require(".././auth/auth.js");

var multer = require('multer');
var FTPStorage = require('multer-ftp');

var storage = new FTPStorage({
  basepath: '/productos',
  ftp: {
    host: '107.180.40.62',
    secure: false,
    user: 'imagenes@remolkar.com',
    password: 'r3m0lk4r123',
    port: 21
  },
  destination: function (req, file, options, callback) {
    callback(null, options.basepath + "/" + file.originalname)
  }
});

var upload = multer({ storage: storage });

var storageTicket = new FTPStorage({
  basepath: '/imagenes/recibos',
  ftp: {
    host: '107.180.40.62',
    secure: false,
    user: 'admin@remolkar.com',
    password: 'H=a$l=(1Zl)&',
    port: 21
  },
  destination: function (req, file, options, callback) {
    callback(null, options.basepath + "/" + file.originalname)
  }
});
var uploadTicket = multer({ storage: storageTicket });
//Numero 5: Error de Servidor
//Numero 0: Validacion en Funcion BD

router.post("/obtenerPath", uploadTicket.single('file'), controller.paymentDetail.obtenerPath);

router.post('/registroUsuario', controller.user.registroUsuario);
router.post('/iniciarSesion', controller.user.iniciarSesion);

router.post('/gestionHorario', auth.seguridad, controller.schedule.gestionHorario);
router.get('/listarHorarios', auth.seguridad, controller.schedule.listarHorarios);

router.post("/gestionEmpresa", auth.seguridad, upload.single('file'), controller.company.gestionEmpresa);
router.get('/listarEmpresa', controller.company.listarEmpresa);

router.post('/gestionSucursal', auth.seguridad, controller.companybranch.gestionSucursal);
router.get('/listarSucursales', auth.seguridad, controller.companybranch.listarSucursales);

router.post('/gestionCliente', auth.seguridad, controller.client.gestionCliente);
router.get('/listarClientes', auth.seguridad, controller.client.listarClientes);

router.post('/gestionEmpleado', auth.seguridad, controller.employee.gestionEmpleado);
router.get('/listarEmpleados', auth.seguridad, controller.employee.listarEmpleados);

router.post("/gestionFormaPago", auth.seguridad, upload.single('file'), controller.paymentmethod.gestionFormaPago);
router.get('/listarFormasPago', controller.paymentmethod.listarFormasPago);

router.get('/listarProductos', controller.product.listarProductos);
router.get('/listarServicios', controller.product.listarServicios);


router.post('/listarProductosPaginacion', controller.product.listarProductosPaginacion);

router.get('/listarProducto', controller.product.listarProducto);
router.get('/listarProductosDescuentos', controller.product.listarProductosDescuentos);
router.get('/listarProductosUltimos', controller.product.listarProductosUltimos);
router.get('/listarProductoPromocionUnica', controller.product.listarProductoPromocionUnica);

router.post('/listarProductosLlantas', controller.product.listarProductosLlantas);

router.get('/listarProductosRelacionados', controller.product.listarProductosRelacionados);

router.get('/listarProductosRangoPrecios', controller.product.listarProductosRangoPrecios);

router.get('/listarDetallesLlanta', controller.product.listarDetallesLlanta);

router.get('/listarVideos', controller.videos.listarVideos);

router.get('/listarCarrusel', controller.carousel.listarCarrusel);

router.get('/listarCategorias', controller.category.listarCategorias);

router.get('/listarMarcas', controller.brand.listarMarcas);

router.post('/gestionComentario', auth.seguridad, controller.commentary.gestionComentario);
router.get('/listarComentariosProducto', controller.commentary.listarComentariosProducto);

router.post('/gestionFavorito', controller.favorite.gestionFavorito);
router.get('/listarFavoritosProductos', controller.favorite.listarFavoritosProductos);

router.get('/listarMarcasVehiculo', controller.vehicle.listarMarcas);
router.get('/listarModelosVehiculo', controller.vehicle.listarModelos);

router.post('/obtenerChekoutId', controller.payment.obtenerChekoutId);

router.get('/listarTalleres', controller.workshop.listarTalleres);

module.exports = router;
