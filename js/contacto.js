/*
Hermanos Jota — Validación del formulario de contacto (cliente)
*/

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const NAME_PATTERN = /^[a-záéíóúüñ]+(?:[\s'-][a-záéíóúüñ]+)*$/i;

const contactValidators = {
    nombre(value) {
        if (!value) return "Contanos tu nombre para poder responderte.";
        if (value.length < 3) return "El nombre debe tener al menos 3 caracteres.";
        if (value.length > 60) return "El nombre no puede superar los 60 caracteres.";
        if (!NAME_PATTERN.test(value)) return "Usá solo letras y espacios en el nombre.";
        return "";
    },
    email(value) {
        if (!value) return "Necesitamos tu email para contestarte.";
        if (!EMAIL_PATTERN.test(value)) return "Ingresá un email válido, por ejemplo nombre@correo.com.";
        return "";
    },
    mensaje(value) {
        if (!value) return "Escribinos tu consulta.";
        if (value.length < 10) return "Contanos un poco más: al menos 10 caracteres.";
        if (value.length > 600) return "El mensaje no puede superar los 600 caracteres.";
        return "";
    }
};

function showFieldError(field, message) {
    const errorEl = document.getElementById(`error-${field.name}`);

    field.classList.add("form-field__input--invalid");
    field.setAttribute("aria-invalid", "true");

    if (errorEl) {
        errorEl.textContent = message;
    }
}

function clearFieldError(field) {
    const errorEl = document.getElementById(`error-${field.name}`);

    field.classList.remove("form-field__input--invalid");
    field.removeAttribute("aria-invalid");

    if (errorEl) {
        errorEl.textContent = "";
    }
}

function validateField(field) {
    const validator = contactValidators[field.name];
    if (!validator) return true;

    const message = validator(field.value.trim());

    if (message) {
        showFieldError(field, message);
        return false;
    }

    clearFieldError(field);
    return true;
}

function hideSuccessMessage() {
    const successEl = document.getElementById("formSuccess");
    if (!successEl) return;

    successEl.hidden = true;
    successEl.innerHTML = "";
}

function showSuccessMessage(nombre) {
    const successEl = document.getElementById("formSuccess");
    if (!successEl) return;

    successEl.innerHTML = "";

    const title = document.createElement("h3");
    title.className = "form-success__title";
    title.textContent = `¡Gracias, ${nombre}!`;

    const text = document.createElement("p");
    text.className = "form-success__text";
    text.textContent = "Recibimos tu mensaje. Un integrante del taller te va a escribir dentro de las próximas 48 horas hábiles.";

    successEl.append(title, text);
    successEl.hidden = false;
    successEl.focus();
}

function updateCharCounter(textarea) {
    const counter = document.getElementById("mensajeCounter");
    if (!counter) return;

    counter.textContent = `${textarea.value.trim().length} / 600 caracteres`;
}

function setupContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const fields = Array.from(form.elements).filter((element) => contactValidators[element.name]);
    const textarea = form.elements.mensaje;

    fields.forEach((field) => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
            if (field.classList.contains("form-field__input--invalid")) {
                validateField(field);
            }
        });
    });

    if (textarea) {
        textarea.addEventListener("input", () => updateCharCounter(textarea));
        updateCharCounter(textarea);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        hideSuccessMessage();

        const invalidFields = fields.filter((field) => !validateField(field));

        if (invalidFields.length > 0) {
            invalidFields[0].focus();
            return;
        }

        const nombre = form.elements.nombre.value.trim();

        // Limpiamos primero: form.reset() dispara el evento "reset",
        // que oculta cualquier mensaje de éxito anterior.
        form.reset();
        fields.forEach(clearFieldError);

        if (textarea) {
            updateCharCounter(textarea);
        }

        showSuccessMessage(nombre);
    });

    form.addEventListener("reset", () => {
        hideSuccessMessage();
        fields.forEach(clearFieldError);

        if (textarea) {
            setTimeout(() => updateCharCounter(textarea), 0);
        }
    });
}

document.addEventListener("DOMContentLoaded", setupContactForm);
