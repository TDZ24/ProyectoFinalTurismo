// VALIDACIÓN FORMULARIO RESERVA

document.getElementById("formReserva").addEventListener("submit", function (e) {
  e.preventDefault();
  limpiarMensajes();

  const nombre   = document.getElementById("nombre").value.trim();
  const email    = document.getElementById("email").value.trim();
  const destino  = document.getElementById("destino").value.trim();
  const fecha    = document.getElementById("fecha").value;
  const personas = parseInt(document.getElementById("personas").value);

  let valido = true;

  // Nombre
  if (nombre === "") {
    mostrarError("errorNombre", "El nombre es obligatorio");
    valido = false;
  }

  // Email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    mostrarError("errorEmail", "El correo es obligatorio");
    valido = false;
  } else if (!regex.test(email)) {
    mostrarError("errorEmail", "Ingrese un correo válido");
    valido = false;
  }

  // Destino
  if (destino === "") {
    mostrarError("errorDestino", "Ingrese un destino");
    valido = false;
  }

  // Fecha
  const hoy = new Date().toISOString().split("T")[0];
  if (fecha === "") {
    mostrarError("errorFecha", "Seleccione una fecha");
    valido = false;
  } else if (fecha < hoy) {
    mostrarError("errorFecha", "La fecha no puede ser en el pasado");
    valido = false;
  }

  // Personas
  if (!personas || isNaN(personas)) {
    mostrarError("errorPersonas", "Ingrese el número de personas");
    valido = false;
  } else if (personas <= 0) {
    mostrarError("errorPersonas", "Debe ser mayor a 0");
    valido = false;
  }

  // Todo OK
  if (valido) {
    const exito = document.getElementById("mensajeExito");
    exito.classList.remove("d-none");   // ← quita el d-none para mostrarlo
    exito.classList.add("alert-exito");
    exito.innerText = "✅ ¡Reserva realizada correctamente!";
    document.getElementById("formReserva").reset();

    // Guardar reserva en localStorage
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push({ nombre, email, destino, fecha, personas });
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
      exito.classList.add("d-none");
    }, 4000);
  }
});

function mostrarError(id, mensaje) {
  document.getElementById(id).innerText = mensaje;
}

function limpiarMensajes() {
  document.querySelectorAll(".error-text, small[id^='error']").forEach(el => el.innerText = "");
  const exito = document.getElementById("mensajeExito");
  if (exito) {
    exito.classList.add("d-none");
    exito.innerText = "";
  }
}
