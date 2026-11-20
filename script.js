// 1. Sustituye este correo por el correo en el que quieres recibir los mensajes.
const DESTINATION_EMAIL = "TU_CORREO@gmail.com";

const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");
const buttonLabel = document.getElementById("button-label");
const statusMessage = document.getElementById("form-status");

document.getElementById("year").textContent = new Date().getFullYear();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (DESTINATION_EMAIL === "TU_CORREO@gmail.com") {
    statusMessage.textContent = "Primero configura tu correo en el archivo script.js.";
    statusMessage.className = "form-status error";
    return;
  }

  submitButton.disabled = true;
  buttonLabel.textContent = "Enviando...";
  statusMessage.textContent = "";
  statusMessage.className = "form-status";

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DESTINATION_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    const result = await response.json();

    if (!response.ok || result.success !== "true" && result.success !== true) {
      throw new Error(result.message || "No se ha podido enviar el mensaje.");
    }

    form.reset();
    statusMessage.textContent = "Mensaje enviado correctamente. Te responderemos por correo electrónico.";
    statusMessage.className = "form-status success";
  } catch (error) {
    statusMessage.textContent = "No se ha podido enviar. Comprueba tu conexión e inténtalo de nuevo.";
    statusMessage.className = "form-status error";
  } finally {
    submitButton.disabled = false;
    buttonLabel.textContent = "Enviar mensaje";
  }
});
