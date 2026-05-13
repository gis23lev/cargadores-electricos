const numeroWhatsApp = "59165316991";

const form = document.getElementById("quoteForm");
const whatsappDirect = document.getElementById("whatsappDirect");
const whatsappFallback = document.getElementById("whatsappFallback");
const quickQuestions = document.getElementById("quickQuestions");
const chatWindow = document.getElementById("chatWindow");
const chatbotTrigger = document.getElementById("chatbotTrigger");
const chatbotPanel = document.getElementById("chatbotPanel");
const chatbotClose = document.getElementById("chatbotClose");
const floatingQuote = document.querySelector(".floating-quote");
const chatbotFloating = document.querySelector(".chatbot-floating");
const footer = document.querySelector(".footer");

const mensajeBase = "Hola, quiero cotizar la instalación de un cargador para auto eléctrico.";
const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeBase)}`;

if (whatsappDirect) {
  whatsappDirect.href = urlWhatsApp;
}

if (whatsappFallback) {
  whatsappFallback.href = urlWhatsApp;
}

const respuestasFAQ = {
  precio:
    "El precio no es fijo. Depende de distancia del cableado, protecciones eléctricas, tipo de instalación y condiciones del lugar.",
  lugares:
    "Sí, instalamos en casas, departamentos, edificios, garajes y negocios.",
  "sin-cargador":
    "Sí, puedes cotizar sin tener cargador. Te recomendamos el modelo según tu vehículo y tu energía disponible.",
  tiempo:
    "Una instalación estándar suele tardar entre 3 y 6 horas. Casos con mayor distancia o adecuaciones pueden tardar más.",
};

function agregarBurbuja(texto, tipo) {
  if (!chatWindow) return;
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${tipo}`;
  bubble.textContent = texto;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

if (quickQuestions) {
  quickQuestions.addEventListener("click", function (event) {
    const btn = event.target.closest(".quick-btn");
    if (!btn) return;

    const key = btn.dataset.question;
    const pregunta = btn.textContent;
    const respuesta = respuestasFAQ[key];
    if (!respuesta) return;

    agregarBurbuja(pregunta, "user");
    setTimeout(function () {
      agregarBurbuja(respuesta, "bot");
    }, 180);
  });
}

if (chatbotTrigger && chatbotPanel) {
  chatbotTrigger.addEventListener("click", function () {
    chatbotPanel.classList.toggle("open");
    chatbotPanel.setAttribute(
      "aria-hidden",
      String(!chatbotPanel.classList.contains("open"))
    );
  });
}

if (chatbotClose && chatbotPanel) {
  chatbotClose.addEventListener("click", function () {
    chatbotPanel.classList.remove("open");
    chatbotPanel.setAttribute("aria-hidden", "true");
  });
}

if (footer) {
  const observer = new IntersectionObserver(
    function (entries) {
      const visible = entries[0].isIntersecting;
      if (floatingQuote) {
        floatingQuote.classList.toggle("floating-hidden", visible);
      }
      if (chatbotFloating) {
        chatbotFloating.classList.toggle("floating-hidden", visible);
      }
    },
    { threshold: 0.12 }
  );
  observer.observe(footer);
}

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
