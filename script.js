const numeroWhatsApp = "59165316991";

const form = document.getElementById("quoteForm");
const whatsappDirect = document.getElementById("whatsappDirect");

whatsappDirect.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
  "Hola, quiero cotizar la instalación de un cargador para auto eléctrico."
)}`;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const ciudad = document.getElementById("ciudad").value;
  const tipo = document.getElementById("tipo").value;
  const distancia = document.getElementById("distancia").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const cargador = document.getElementById("cargador").value;
  const energia = document.getElementById("energia").value;
  const mensaje = document.getElementById("mensaje").value;

  const texto = `
Hola, quiero cotizar la instalación de un cargador para auto eléctrico.

Mis datos son:

Nombre: ${nombre}
WhatsApp: ${telefono}
Ciudad/Zona: ${ciudad}

Detalles de la instalación:
Tipo de instalación: ${tipo}
Distancia desde el tablero: ${distancia}
Ubicación del cargador: ${ubicacion}
Cargador: ${cargador}
Tipo de energía: ${energia}

Comentario adicional:
${mensaje || "Sin comentario adicional."}
  `;

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
});