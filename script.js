// CONFIGURACIÓN: escribe aquí el correo en el que quieres recibir los mensajes.
// Ejemplo: const DESTINATION_EMAIL = "tucorreo@gmail.com";
const DESTINATION_EMAIL = "dominguezaritz2@gmail.com";

const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");
const buttonLabel = document.getElementById("button-label");
const statusMessage = document.getElementById("form-status");

document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", (event) => {
  // Evita enviar el formulario si todavía no has puesto tu dirección.
  if (!DESTINATION_EMAIL || DESTINATION_EMAIL === "PON_AQUI_TU_CORREO" || !DESTINATION_EMAIL.includes("@")) {
    event.preventDefault();
    statusMessage.textContent = "Falta configurar tu correo. Abre script.js y sustituye PON_AQUI_TU_CORREO por tu dirección.";
    statusMessage.className = "form-status error";
    return;
  }

  // FormSubmit recibe el formulario directamente. No requiere AJAX ni claves API.
  form.action = `https://formsubmit.co/${encodeURIComponent(DESTINATION_EMAIL.trim())}`;
  form.method = "POST";
  submitButton.disabled = true;
  buttonLabel.textContent = "Enviando...";
  statusMessage.textContent = "Enviando tu mensaje. No cierres esta página...";
  statusMessage.className = "form-status";
});
