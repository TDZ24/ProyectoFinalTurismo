const STATS = [
  { valor: "6+", label: "Destinos en Colombia", icono: "fas fa-map-location-dot" },
  { valor: "24/7", label: "Acompanamiento", icono: "fas fa-headset" },
  { valor: "15 anos", label: "De experiencia", icono: "fas fa-award" },
  { valor: "98%", label: "Satisfaccion", icono: "fas fa-star" },
];

function renderStats() {
  const contenedor = document.getElementById("stats-container");
  if (!contenedor) return;
  contenedor.innerHTML = STATS.map(s => `
    <div class="col-6 col-md-3 stat-item">
      <i class="${s.icono} fa-2x mb-2"></i>
      <h2>${s.valor}</h2>
      <p class="mb-0">${s.label}</p>
    </div>`).join("");
}

function crearTarjetaDestino(destino) {
  return `
    <div class="col-md-6 col-lg-4">
      <article class="destino-card card border-0 h-100">
        <div class="destino-img-wrap">
          <img src="${destino.img}" class="card-img-top destino-img"
               alt="${destino.lugar}"
               onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=380&fit=crop'">
        </div>
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h5 class="fw-bold mb-0"><i class="${destino.icono} me-2 text-primary"></i>${destino.lugar}</h5>
            <span class="badge-precio">${destino.precio}</span>
          </div>
          <small class="text-muted mb-2"><i class="fas fa-location-dot me-1"></i>${destino.departamento}</small>
          <p class="small text-muted flex-grow-1">${destino.descripcion}</p>
          <div class="destino-info">
            <span><i class="fas fa-cloud-sun me-1"></i>${destino.clima}</span>
            <span><i class="fas fa-calendar-days me-1"></i>${destino.duracion}</span>
          </div>
          <a href="planes.html?destino=${encodeURIComponent(destino.id)}" class="btn btn-primary w-100 mt-3">
            Ver informacion del lugar
          </a>
        </div>
      </article>
    </div>`;
}

function cargarDestinosIndex() {
  const contenedor = document.getElementById("destinos-container");
  if (!contenedor) return;
  contenedor.innerHTML = obtenerDestinosColombia().map(crearTarjetaDestino).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  cargarDestinosIndex();
});
