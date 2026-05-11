function crearTarjetaPlan(destino) {
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destino.lugar}, Colombia`)}`;
  const actividades = destino.actividades.map(actividad => `<li>${actividad}</li>`).join("");

  return `
    <div class="col-md-6 col-lg-4">
      <article class="plan-card h-100 d-flex flex-column">
        <img src="${destino.img}" alt="${destino.lugar}" class="plan-img"
             onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=380&fit=crop'">
        <div class="plan-body flex-grow-1 d-flex flex-column">
          <span class="badge bg-secondary mb-2">${destino.departamento}</span>
          <h5 class="fw-bold mb-1"><i class="${destino.icono} me-2 text-primary"></i>${destino.lugar}</h5>
          <p class="text-muted small mb-2">${destino.descripcion}</p>
          <div class="plan-detail">
            <span><i class="fas fa-cloud-sun me-1"></i>${destino.clima}</span>
            <span><i class="fas fa-calendar-days me-1"></i>${destino.duracion}</span>
          </div>
          <p class="small mt-3 mb-1 fw-semibold">Ideal para:</p>
          <p class="text-muted small mb-2">${destino.ideal}</p>
          <p class="small mb-1 fw-semibold">Que puedes visitar:</p>
          <ul class="text-muted small plan-list flex-grow-1">${actividades}</ul>
          <p class="plan-precio mt-2">${destino.precio} <span class="fs-6 fw-normal text-muted">/ persona</span></p>
          <div class="d-grid gap-2 mt-auto">
            <a href="reservas.html?destino=${encodeURIComponent(destino.lugar)}" class="btn btn-plan">
              <i class="fas fa-calendar-check me-1"></i> Reservar este lugar
            </a>
            <a href="${mapa}" target="_blank" rel="noopener" class="btn btn-outline-secondary">
              <i class="fas fa-map-marked-alt me-1"></i> Ver en mapa
            </a>
          </div>
        </div>
      </article>
    </div>`;
}

function cargarPlanes() {
  const params = new URLSearchParams(window.location.search);
  const destinoFiltro = params.get("destino");
  const destinos = obtenerDestinosColombia();
  const lista = destinoFiltro ? destinos.filter(d => d.id === destinoFiltro) : destinos;
  const contenedor = document.getElementById("planesContainer");
  const titulo = document.querySelector(".planes h2");

  if (!contenedor) return;

  if (titulo && destinoFiltro && lista[0]) {
    titulo.innerHTML = `Informacion de ${lista[0].lugar}
      <a href="planes.html" class="btn btn-sm btn-outline-secondary ms-3">
        <i class="fas fa-arrow-left me-1"></i> Ver todos
      </a>`;
  }

  if (!lista.length) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning rounded-4">No encontramos ese destino en Colombia.</div>
      </div>`;
    return;
  }

  contenedor.innerHTML = lista.map(crearTarjetaPlan).join("");
}

document.addEventListener("DOMContentLoaded", cargarPlanes);
