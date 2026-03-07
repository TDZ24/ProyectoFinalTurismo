// Cuando se envía el formulario
document.getElementById("formReserva").addEventListener("submit", function(e) {

    e.preventDefault(); // evitamos que recargue la página

    limpiarMensajes();

    // Guardamos los valores
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let destino = document.getElementById("destino").value;
    let fecha = document.getElementById("fecha").value;
    let personas = document.getElementById("personas").value;

    let valido = true;

    // Validación nombre
    if (nombre === "") {
        mostrarError("errorNombre", "El nombre es obligatorio");
        valido = false;
    }

    // Validación email
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        mostrarError("errorEmail", "El correo es obligatorio");
        valido = false;
    } else if (!regex.test(email)) {
        mostrarError("errorEmail", "Ingrese un correo válido");
        valido = false;
    }

    // Validación destino
    if (destino === "") {
        mostrarError("errorDestino", "Seleccione un destino");
        valido = false;
    }

    // Validación fecha
    let hoy = new Date().toISOString().split("T")[0];

    if (fecha === "") {
        mostrarError("errorFecha", "Seleccione una fecha");
        valido = false;
    } else if (fecha < hoy) {
        mostrarError("errorFecha", "La fecha no puede ser pasada");
        valido = false;
    }

    // Validación personas
    if (personas === "") {
        mostrarError("errorPersonas", "Ingrese el número de personas");
        valido = false;
    } else if (personas <= 0) {
        mostrarError("errorPersonas", "Debe ser mayor a 0");
        valido = false;
    }

    // Si todo está bien
    if (valido) {
        document.getElementById("mensajeExito").innerText =
            "Reserva realizada correctamente";
        document.getElementById("formReserva").reset();
    }

});

// Mostrar errores
function mostrarError(id, mensaje) {
    document.getElementById(id).innerText = mensaje;
}

// Limpiar mensajes antes de validar otra vez
function limpiarMensajes() {
    document.querySelectorAll(".error-text").forEach(el => el.innerText = "");
    document.getElementById("mensajeExito").innerText = "";
}