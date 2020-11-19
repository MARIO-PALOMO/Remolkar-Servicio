
function reemplazo(valor) {
  var dato = valor;
  var reemplazar = dato.replace(".", "");
  return reemplazar.replace(",", "");
}

function agregarDigitos(numero, valor) {
  var resultado = "";
  var dato = numero - valor.length;
  var longitud = 0;

  if (dato >= 1) {
    longitud = dato;
  }
  else if (dato <= -1) {
    longitud = dato * (-1);
  }

  for (var i = 0; i < longitud; i++) {
    resultado = resultado + "0";
  }

  return resultado + valor;
}

module.exports = {

  generacionParametroPersonalizado: (iva, totalTarifa12, totalTarifa0) => {
    var valorBase12 = totalTarifa12;
    var ivaValorBase12 = iva;
    var totalBase12 = valorBase12;
    var totalBase0 = totalTarifa0;

    //PARAMETRO VALOR IVA 12%
    var parametroIva12 = "004" + "012" + agregarDigitos(12, reemplazo(ivaValorBase12));

    //PARAMETRO BASE TARIFA 0%
    var parametroBase0 = "052" + "012" + agregarDigitos(12, reemplazo(totalBase0));

    //IDENTIFICADOR DE COMERCIO ELECTRONICO
    var parametroComercio = "003" + "007" + "0103910";

    //IDENTIFICADOR DE PROVEEDOR DE SERVICIO
    var parametroProveedor = "051" + "008" + "17913101";

    //TOTAL BASE TARIFA 12%
    var parametroBase12 = "053" + "012" + agregarDigitos(12, reemplazo(totalBase12));

    //LONGITUD TOTAL DEL PARAMETRO
    var parametroLongitud = "" + "" + "0081";

    var parametroResultado = parametroLongitud + parametroComercio + parametroIva12 + parametroProveedor + parametroBase0 + parametroBase12;

    return parametroResultado;
  },

  generarIp: () => {
    var ip1 = "190." + "107." + "79." + Math.round(Math.random() * 255);
    var ip2 = "190." + "120." + "79." + Math.round(Math.random() * 255);
    var ip3 = "190." + "152." + "255." + Math.round(Math.random() * 255);
    var ip4 = "200." + "31." + "10." + Math.round(Math.random() * 255);
    var ip5 = "200." + "41." + "81." + Math.round(Math.random() * 255);
    var ip6 = "200." + "115." + "47." + Math.round(Math.random() * 255);
    var ip7 = "200." + "107." + "63." + Math.round(Math.random() * 255);

    var ips = [ip2, ip3, ip1, ip4, ip5, ip6, ip7];

    var aleatorio = Math.floor(Math.random() * (ips.length));
    var ip = ips[aleatorio];

    return ip;
  },

}