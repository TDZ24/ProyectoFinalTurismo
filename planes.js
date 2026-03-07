const destinosCurados = [
  { pais: "France",    precio: "$1,200", descripcion: "Romántica ciudad de las luces, arte y gastronomía." },
  { pais: "Japan",     precio: "$2,100", descripcion: "Tradición y modernidad en perfecta armonía." },
  { pais: "Mexico",    precio: "$850",   descripcion: "Cultura, playas y sabores inigualables." },
  { pais: "Italy",     precio: "$1,350", descripcion: "Historia, arquitectura y la mejor cocina del mundo." },
  { pais: "Brazil",    precio: "$980",   descripcion: "Naturaleza exuberante, carnaval y playas infinitas." },
  { pais: "Australia", precio: "$2,400", descripcion: "Aventura salvaje en el continente más sorprendente." },
];


function mostrarLoader() {
  document.getElementById("planesContainer").innerHTML = `
    <div class="col-12 text-center py-5" id="loader">
      <div class="spinner-border text-primary" role="status" style="width:3rem;height:3rem;">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 text-muted fw-semibold">Cargando planes disponibles…</p>
    </div>`;
}

function mostrarError(mensaje) {
  document.getElementById("planesContainer").innerHTML = `
    <div class="col-12">
      <div class="alert alert-danger d-flex align-items-center gap-3 rounded-4 shadow-sm" role="alert">
        <i class="fas fa-exclamation-triangle fa-2x"></i>
        <div>
          <strong>¡Oops! Algo salió mal.</strong><br>
          <span class="text-muted small">${mensaje}</span>
        </div>
        <button class="btn btn-outline-danger ms-auto" onclick="cargarPlanes()">
          <i class="fas fa-redo me-1"></i> Reintentar
        </button>
      </div>
    </div>`;
}

function crearTarjetaPlan(data, extra) {

  const nombre    = data.translations?.spa?.common || data.name.common;
  const capital   = data.capital?.[0]              || "—";
  const region    = data.region                    || "—";
  const bandera   = data.flags?.svg || data.flags?.png || "";
  const mapa      = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nombre)}`;

  return `
    <div class="col-md-6 col-lg-4">
      <div class="plan-card h-100 d-flex flex-column">
        <img src="${bandera}" alt="Bandera de ${nombre}" class="plan-img"
             onerror="this.src='https://via.placeholder.com/400x200?text=Sin+imagen'">
        <div class="plan-body flex-grow-1 d-flex flex-column">
          <span class="badge bg-secondary mb-2">${region}</span>
          <h5 class="fw-bold mb-1">${nombre}</h5>
          <p class="text-muted small mb-1"><i class="fas fa-city me-1"></i>Capital: <strong>${capital}</strong></p>
          <p class="text-muted small flex-grow-1">${extra.descripcion}</p>
          <p class="plan-precio mt-2">${extra.precio} <span class="fs-6 fw-normal text-muted">/ persona</span></p>
          <a href="${mapa}" target="_blank" rel="noopener" class="btn btn-plan w-100 mt-auto">
            <i class="fas fa-map-marked-alt me-1"></i> Ver destino
          </a>
        </div>
      </div>
    </div>`;
}

async function cargarPlanes() {
  mostrarLoader();

  try {
   
    const nombres = destinosCurados.map(d => d.pais).join(",");
    const url = `https://restcountries.com/v3.1/alpha?codes=${nombres.split(",")
      .map(p => encodeURIComponent(p)).join(",")}`;

    
    const promesas = destinosCurados.map(d =>
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(d.pais)}?fullText=true`)
        .then(res => {
          if (!res.ok) throw new Error(`No se encontró el país: ${d.pais}`);
          return res.json();
        })
        .then(data => ({ data: data[0], extra: d }))
    );

    const resultados = await Promise.allSettled(promesas);

    const contenedor = document.getElementById("planesContainer");
    contenedor.innerHTML = ""; // limpiamos loader

    let hayResultados = false;

    resultados.forEach(resultado => {
      if (resultado.status === "fulfilled") {
        const { data, extra } = resultado.value;
        contenedor.innerHTML += crearTarjetaPlan(data, extra);
        hayResultados = true;
      } else {
        console.warn("Error en un país:", resultado.reason);
      }
    });

    if (!hayResultados) {
      mostrarError("No se pudo cargar ningún plan. Verifica tu conexión a internet.");
    }

  } catch (error) {
    console.error("Error al cargar planes:", error);
    mostrarError(error.message || "Error de conexión. Intenta de nuevo más tarde.");
  }
}

document.addEventListener("DOMContentLoaded", cargarPlanes);
