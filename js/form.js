<<<<<<< HEAD
// VALIDACIÓN FORMULARIO RESERVA

document.getElementById("formReserva").addEventListener("submit", function (e) {
=======
// form.js — Reservas integradas con backend Spring Boot

document.getElementById("formReserva").addEventListener("submit", async function (e) {
>>>>>>> master
  e.preventDefault();
  limpiarMensajes();

  const nombre   = document.getElementById("nombre").value.trim();
  const email    = document.getElementById("email").value.trim();
  const destino  = document.getElementById("destino").value.trim();
  const fecha    = document.getElementById("fecha").value;
  const personas = parseInt(document.getElementById("personas").value);

  let valido = true;
<<<<<<< HEAD

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
=======
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hoy = new Date().toISOString().split("T")[0];

  if (!nombre)   { mostrarError("errorNombre",   "El nombre es obligatorio"); valido = false; }
  if (!email)    { mostrarError("errorEmail",    "El correo es obligatorio"); valido = false; }
  else if (!regex.test(email)) { mostrarError("errorEmail", "Ingrese un correo válido"); valido = false; }
  if (!destino)  { mostrarError("errorDestino",  "Ingrese un destino"); valido = false; }
  if (!fecha)    { mostrarError("errorFecha",    "Seleccione una fecha"); valido = false; }
  else if (fecha < hoy) { mostrarError("errorFecha", "La fecha no puede ser en el pasado"); valido = false; }
  if (!personas || isNaN(personas)) { mostrarError("errorPersonas", "Ingrese el número de personas"); valido = false; }
  else if (personas <= 0) { mostrarError("errorPersonas", "Debe ser mayor a 0"); valido = false; }

  if (!valido) return;

  const exito = document.getElementById("mensajeExito");
  exito.className = "alert mt-3 text-center";
  exito.classList.remove("d-none");
  exito.innerText = "Enviando reserva...";

  try {
    const userId = localStorage.getItem("userId");

    // Intentar encontrar el producto en el backend
    let productoId = null;
    try {
      const productos = await apiGetProductos();
      if (Array.isArray(productos)) {
        const producto = productos.find(p =>
          p.nombre?.toLowerCase().includes(destino.toLowerCase()) ||
          destino.toLowerCase().includes(p.nombre?.toLowerCase())
        );
        if (producto) productoId = producto.id;
      }
    } catch (_) {
      // Si falla obtener productos, continuamos guardando localmente
    }

    if (userId && productoId) {
      // Caso ideal: usuario logueado + producto encontrado → guardar en backend
      const reservaBackend = await apiCrearReserva(parseInt(userId), productoId, personas);

      // También guardar en localStorage con el ID real del backend
      guardarReservaLocal({
        id: reservaBackend?.id || null,  // ID real del backend
        nombre, email, destino, fecha, personas,
        enBackend: true
      });

      exito.innerText = "✅ Reserva confirmada en el sistema.";
      exito.classList.add("alert-success");

    } else {
      // Guardar solo localmente (sin producto match o sin userId)
      guardarReservaLocal({ nombre, email, destino, fecha, personas, enBackend: false });

      if (!userId) {
        exito.innerText = "⚠️ Reserva guardada localmente. Inicia sesión para sincronizar con el servidor.";
      } else {
        exito.innerText = "⚠️ Destino no encontrado en el catálogo. Reserva guardada localmente.";
      }
      exito.classList.add("alert-warning");
    }

    document.getElementById("formReserva").reset();
    mostrarReservas(); // refrescar tabla si está visible
    setTimeout(() => { exito.classList.add("d-none"); }, 5000);

  } catch (err) {
    exito.innerText = "❌ Error al procesar la reserva: " + err.message;
    exito.classList.add("alert-danger");
  }
});

function guardarReservaLocal(reserva) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

function mostrarError(id, mensaje) {
  const el = document.getElementById(id);
  if (el) el.innerText = mensaje;
}

function limpiarMensajes() {
  document.querySelectorAll("small[id^='error']").forEach(el => el.innerText = "");
>>>>>>> master
  const exito = document.getElementById("mensajeExito");
  if (exito) {
    exito.classList.add("d-none");
    exito.innerText = "";
<<<<<<< HEAD
  }
}
=======
    exito.className = "alert mt-3 text-center d-none";
  }
}

// ── Mostrar tabla de reservas ─────────────────────────────────────────────────
function mostrarReservas() {
  const tabla    = document.getElementById("tablaReservas");
  const contenido = document.getElementById("contenidoTabla");
  if (!tabla || !contenido) return;

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  tabla.classList.remove("d-none");
  contenido.innerHTML = "";

  if (reservas.length === 0) {
    contenido.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No hay reservas registradas</td></tr>`;
    return;
  }

  reservas.forEach((reserva, index) => {
    contenido.innerHTML += `
      <tr>
        <td>${reserva.nombre}</td>
        <td>${reserva.email}</td>
        <td>${reserva.destino}</td>
        <td>${reserva.fecha}</td>
        <td>${reserva.personas}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

// ── Eliminar reserva ──────────────────────────────────────────────────────────
async function eliminarReserva(index) {
  if (!confirm("¿Seguro que deseas eliminar esta reserva?")) return;

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const reserva = reservas[index];

  // Si tiene ID real del backend, eliminarlo también allá
  if (reserva?.enBackend && reserva?.id) {
    try {
      await apiEliminarReserva(reserva.id);
    } catch (err) {
      // Si falla en el back (ej: ya fue eliminada), continuamos eliminando localmente
      console.warn("No se pudo eliminar del backend:", err.message);
    }
  }

  reservas.splice(index, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  mostrarReservas();
}
>>>>>>> master
