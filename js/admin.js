function protegerAdmin() {
  const logueado = localStorage.getItem("usuarioLogueado") === "true";
  const rol = localStorage.getItem("rolUsuario");

  if (!logueado || rol !== "admin") {
    window.location.href = "login.html";
  }
}

function leerReservas() {
  return JSON.parse(localStorage.getItem("reservas")) || [];
}

function leerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function renderAdminStats() {
  const reservas = leerReservas();
  const usuarios = leerUsuarios();
  const destinos = obtenerDestinosColombia();
  const viajeros = reservas.reduce((total, reserva) => total + Number(reserva.personas || 0), 0);

  document.getElementById("adminStats").innerHTML = [
    { icono: "fas fa-calendar-check", valor: reservas.length, label: "Reservas" },
    { icono: "fas fa-users", valor: usuarios.length, label: "Usuarios registrados" },
    { icono: "fas fa-map-location-dot", valor: destinos.length, label: "Destinos activos" },
    { icono: "fas fa-suitcase-rolling", valor: viajeros, label: "Viajeros reservados" },
  ].map(stat => `
    <div class="col-6 col-lg-3">
      <article class="admin-stat h-100">
        <i class="${stat.icono} mb-2"></i>
        <strong>${stat.valor}</strong>
        <span>${stat.label}</span>
      </article>
    </div>
  `).join("");
}

function renderReservas() {
  const reservas = leerReservas();
  const tabla = document.getElementById("tablaReservasAdmin");

  if (!reservas.length) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Todavia no hay reservas.</td></tr>`;
    return;
  }

  tabla.innerHTML = reservas.map((reserva, index) => `
    <tr>
      <td>
        <strong>${reserva.nombre}</strong><br>
        <span class="text-muted small">${reserva.email}</span>
      </td>
      <td>${reserva.destino}</td>
      <td>${reserva.fecha}</td>
      <td>${reserva.personas}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarReservaAdmin(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join("");
}

function renderUsuarios() {
  const usuarios = leerUsuarios();
  const contenedor = document.getElementById("listaUsuariosAdmin");

  if (!usuarios.length) {
    contenedor.innerHTML = `<p class="text-muted mb-0">Todavia no hay usuarios registrados.</p>`;
    return;
  }

  contenedor.innerHTML = usuarios.map(usuario => `
    <div class="user-row">
      <strong>${usuario.nombre}</strong>
      <div class="text-muted small">${usuario.email}</div>
      <span class="badge bg-info text-dark mt-2">${usuario.rol || "cliente"}</span>
    </div>
  `).join("");
}

function renderDestinos() {
  const contenedor = document.getElementById("destinosAdminLista");
  contenedor.innerHTML = obtenerDestinosColombia().map(destino => `
    <div class="col-md-6">
      <article class="destino-admin-card h-100">
        <img src="${destino.img}" alt="${destino.lugar}">
        <div class="mt-2">
          <strong>${destino.lugar}</strong>
          <div class="text-muted small">${destino.departamento} - ${destino.precio}</div>
        </div>
      </article>
    </div>
  `).join("");
}

function eliminarReservaAdmin(index) {
  const reservas = leerReservas();
  reservas.splice(index, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  renderTodoAdmin();
}

function limpiarReservas() {
  localStorage.setItem("reservas", JSON.stringify([]));
  renderTodoAdmin();
}

function crearId(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function configurarFormularioDestino() {
  document.getElementById("formDestinoAdmin").addEventListener("submit", event => {
    event.preventDefault();

    const lugar = document.getElementById("adminLugar").value.trim();
    const destino = {
      id: crearId(lugar),
      lugar,
      departamento: document.getElementById("adminDepartamento").value.trim(),
      precio: document.getElementById("adminPrecio").value.trim(),
      img: document.getElementById("adminImagen").value.trim(),
      icono: "fas fa-map-pin",
      descripcion: document.getElementById("adminDescripcion").value.trim(),
      clima: "Por confirmar",
      duracion: document.getElementById("adminDuracion").value.trim(),
      ideal: "Viajeros que quieren descubrir Colombia",
      actividades: document.getElementById("adminActividades").value.split(",").map(a => a.trim()).filter(Boolean),
    };

    const destinosAdmin = JSON.parse(localStorage.getItem("destinosAdmin")) || [];
    destinosAdmin.push(destino);
    localStorage.setItem("destinosAdmin", JSON.stringify(destinosAdmin));

    document.getElementById("mensajeDestinoAdmin").innerHTML = `<span class="text-success">Destino guardado. Ya aparece en el home y en planes.</span>`;
    event.target.reset();
    renderTodoAdmin();
  });
}

function renderTodoAdmin() {
  renderAdminStats();
  renderReservas();
  renderUsuarios();
  renderDestinos();
}

document.addEventListener("DOMContentLoaded", () => {
  protegerAdmin();
  configurarFormularioDestino();
  document.getElementById("btnLimpiarReservas").addEventListener("click", limpiarReservas);
  renderTodoAdmin();
});
