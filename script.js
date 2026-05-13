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
const navSectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const formSteps = document.querySelectorAll(".form-step");
const nextStepBtn = document.getElementById("nextStep");
const prevStepBtn = document.getElementById("prevStep");
const stepIndicators = document.querySelectorAll("[data-step-indicator]");
let currentStep = 0;

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
    chatbotTrigger.classList.toggle("active", chatbotPanel.classList.contains("open"));
    chatbotTrigger.classList.remove("pulse");
    void chatbotTrigger.offsetWidth;
    chatbotTrigger.classList.add("pulse");
    chatbotPanel.setAttribute(
      "aria-hidden",
      String(!chatbotPanel.classList.contains("open"))
    );
  });
}

if (chatbotClose && chatbotPanel) {
  chatbotClose.addEventListener("click", function () {
    chatbotPanel.classList.remove("open");
    if (chatbotTrigger) {
      chatbotTrigger.classList.remove("active");
      chatbotTrigger.classList.remove("pulse");
      void chatbotTrigger.offsetWidth;
      chatbotTrigger.classList.add("pulse");
    }
    chatbotPanel.setAttribute("aria-hidden", "true");
  });
}

const cardsTrack = document.querySelector(".cards");
const cardsDots = document.getElementById("cardsDots");
const stepsTrack = document.querySelector(".steps");
const processDots = document.getElementById("processDots");
let cardsTimer = null;
let stepsTimer = null;
let cardsIndex = 0;
let stepsIndex = 0;

function moverTrackAIndice(track, itemSelector, index) {
  if (!track) return;
  const items = track.querySelectorAll(itemSelector);
  const target = items[index];
  if (!target) return;
  track.scrollTo({
    left: target.offsetLeft,
    behavior: "smooth",
  });
}

function actualizarDots(index) {
  if (!cardsDots) return;
  const dots = cardsDots.querySelectorAll(".dot");
  dots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === index);
  });
}

function iniciarCarruselCardsMovil() {
  if (!cardsTrack) return;
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  if (!isMobile) {
    if (cardsTimer) {
      clearInterval(cardsTimer);
      cardsTimer = null;
    }
    return;
  }

  const cards = cardsTrack.querySelectorAll(".card");
  if (cards.length < 2) return;

  if (cardsTimer) clearInterval(cardsTimer);

  cardsTimer = setInterval(function () {
    cardsIndex = (cardsIndex + 1) % cards.length;
    moverTrackAIndice(cardsTrack, ".card", cardsIndex);
    actualizarDots(cardsIndex);
  }, 3200);
}

if (cardsTrack) {
  cardsTrack.addEventListener("scroll", function () {
    const cards = cardsTrack.querySelectorAll(".card");
    if (!cards.length) return;
    const cardWidth = cardsTrack.clientWidth || 1;
    const index = Math.round(cardsTrack.scrollLeft / cardWidth);
    cardsIndex = Math.max(0, Math.min(index, cards.length - 1));
    actualizarDots(cardsIndex);
  });

  if (cardsDots) {
    cardsDots.addEventListener("click", function (event) {
      const dot = event.target.closest(".dot");
      if (!dot) return;
      const index = Number(dot.dataset.slide);
      const cards = cardsTrack.querySelectorAll(".card");
      if (!cards[index]) return;
      cardsIndex = index;
      moverTrackAIndice(cardsTrack, ".card", cardsIndex);
      actualizarDots(cardsIndex);
    });
  }

  actualizarDots(0);
  iniciarCarruselCardsMovil();
  window.addEventListener("resize", iniciarCarruselCardsMovil);
}

function actualizarDotsProceso(index) {
  if (!processDots) return;
  const dots = processDots.querySelectorAll(".dot");
  dots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === index);
  });
}

function iniciarCarruselProcesoMovil() {
  if (!stepsTrack) return;
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  if (!isMobile) {
    if (stepsTimer) {
      clearInterval(stepsTimer);
      stepsTimer = null;
    }
    return;
  }

  const steps = stepsTrack.querySelectorAll(".step");
  if (steps.length < 2) return;

  if (stepsTimer) clearInterval(stepsTimer);

  stepsTimer = setInterval(function () {
    stepsIndex = (stepsIndex + 1) % steps.length;
    moverTrackAIndice(stepsTrack, ".step", stepsIndex);
    actualizarDotsProceso(stepsIndex);
  }, 3400);
}

if (stepsTrack) {
  stepsTrack.addEventListener("scroll", function () {
    const steps = stepsTrack.querySelectorAll(".step");
    if (!steps.length) return;
    const stepWidth = stepsTrack.clientWidth || 1;
    const index = Math.round(stepsTrack.scrollLeft / stepWidth);
    stepsIndex = Math.max(0, Math.min(index, steps.length - 1));
    actualizarDotsProceso(stepsIndex);
  });

  if (processDots) {
    processDots.addEventListener("click", function (event) {
      const dot = event.target.closest(".dot");
      if (!dot) return;
      const index = Number(dot.dataset.slide);
      const steps = stepsTrack.querySelectorAll(".step");
      if (!steps[index]) return;
      stepsIndex = index;
      moverTrackAIndice(stepsTrack, ".step", stepsIndex);
      actualizarDotsProceso(stepsIndex);
    });
  }

  actualizarDotsProceso(0);
  iniciarCarruselProcesoMovil();
  window.addEventListener("resize", iniciarCarruselProcesoMovil);
}

function actualizarWizard() {
  if (!formSteps.length) return;
  formSteps.forEach(function (step, index) {
    step.classList.toggle("active", index === currentStep);
  });
  stepIndicators.forEach(function (indicator, index) {
    indicator.classList.toggle("active", index === currentStep);
  });
  if (prevStepBtn) prevStepBtn.disabled = currentStep === 0;
  if (nextStepBtn) {
    const last = currentStep === formSteps.length - 1;
    nextStepBtn.style.display = last ? "none" : "inline-block";
  }
}

function validarPasoActual() {
  const step = formSteps[currentStep];
  if (!step) return true;
  const requiredFields = step.querySelectorAll("input[required], select[required], textarea[required]");
  for (const field of requiredFields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

if (nextStepBtn && prevStepBtn && formSteps.length) {
  nextStepBtn.addEventListener("click", function () {
    if (!validarPasoActual()) return;
    if (currentStep < formSteps.length - 1) {
      currentStep += 1;
      actualizarWizard();
    }
  });

  prevStepBtn.addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep -= 1;
      actualizarWizard();
    }
  });

  actualizarWizard();
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

if (navSectionLinks.length) {
  const sectionMap = new Map();
  navSectionLinks.forEach(function (link) {
    const targetId = link.getAttribute("href");
    const section = document.querySelector(targetId);
    if (section) sectionMap.set(section, link);
  });

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navSectionLinks.forEach(function (link) {
          link.classList.remove("active-link");
        });
        const activeLink = sectionMap.get(entry.target);
        if (activeLink) activeLink.classList.add("active-link");
      });
    },
    { threshold: 0.45 }
  );

  sectionMap.forEach(function (_, section) {
    sectionObserver.observe(section);
  });
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
