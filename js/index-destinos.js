const DESTINOS_INDEX = [
  { pais: "Colombia", precio: "$650", emoji: "🏔️", img: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400&h=260&fit=crop" },
  { pais: "Peru",      precio: "$780",  emoji: "🦙", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=260&fit=crop" },
  { pais: "Spain",     precio: "$1,100",emoji: "💃", img: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=400&h=260&fit=crop" },
  { pais: "Thailand",  precio: "$1,400",emoji: "🐘", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=260&fit=crop" },
  { pais: "France",    precio: "$1,200",emoji: "🗼", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=260&fit=crop" },
  { pais: "Japan",     precio: "$2,100",emoji: "🗻", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=260&fit=crop" },
  { pais: "Mexico",    precio: "$850",  emoji: "🌮", img: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&h=260&fit=crop" },
  { pais: "Italy",     precio: "$1,350",emoji: "🍕", img: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=260&fit=crop" },
  { pais: "Brazil",    precio: "$980",  emoji: "🌴", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=260&fit=crop" },
  { pais: "Australia", precio: "$2,400",emoji: "🦘", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=260&fit=crop" },
];

const STATS = [
  { valor: "10,000+", label: "Viajeros felices",    icono: "fas fa-smile" },
  { valor: "120+",    label: "Destinos disponibles",icono: "fas fa-globe" },
  { valor: "15 años", label: "De experiencia",       icono: "fas fa-award" },
  { valor: "98%",     label: "Satisfacción",         icono: "fas fa-star" },
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

function mostrarLoaderDestinos() {
  const c = document.getElementById("destinos-container");
  if (!c) return;
  c.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border" role="status" style="width:3rem;height:3rem;color:var(--turquesa)">
        <span class="visually-hidden">Cargando…</span>
      </div>
      <p class="mt-3 text-muted">Buscando los mejores destinos…</p>
    </div>`;
}

function mostrarErrorDestinos(msg) {
  const c = document.getElementById("destinos-container");
  if (!c) return;
  c.innerHTML = `
    <div class="col-12">
      <div class="alert alert-warning rounded-4" role="alert">
        <i class="fas fa-wifi me-2"></i>
        No pudimos cargar los destinos: <em>${msg}</em>
        <button class="btn btn-sm btn-outline-secondary ms-3" onclick="cargarDestinosIndex()">
          Reintentar
        </button>
      </div>
    </div>`;
}

function crearTarjetaDestino(data, extra) {
  const nombre  = data.translations?.spa?.common || data.name.common;
  const capital = data.capital?.[0] || "—";
  const foto = extra.img;

  return `
    <div class="col-md-6 col-lg-3">
      <div class="destino-card card border-0 h-100" 
           onclick="window.location.href='planes.html?pais=${encodeURIComponent(extra.pais)}'" 
           style="cursor:pointer">
        <div style="overflow:hidden;height:200px;">
          <img src="${foto}" class="card-img-top w-100 h-100"
               style="object-fit:cover;transition:transform 0.4s"
               onmouseover="this.style.transform='scale(1.08)'"
               onmouseout="this.style.transform='scale(1)'"
               alt="${nombre}"
               onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=260&fit=crop'">
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <h6 class="fw-bold mb-0">${extra.emoji} ${nombre}</h6>
            <span class="badge-precio">${extra.precio}</span>
          </div>
          <small class="text-muted"><i class="fas fa-city me-1"></i>${capital}</small>
        </div>
      </div>
    </div>`;
}

async function cargarDestinosIndex() {
  mostrarLoaderDestinos();

  try {
    const promesas = DESTINOS_INDEX.map(d =>
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(d.pais)}?fullText=true`)
        .then(r => { if (!r.ok) throw new Error(d.pais); return r.json(); })
        .then(data => ({ data: data[0], extra: d }))
    );

    const resultados = await Promise.allSettled(promesas);
    const c = document.getElementById("destinos-container");
    if (!c) return;

    c.innerHTML = "";
    resultados.forEach(r => {
      if (r.status === "fulfilled") {
        c.innerHTML += crearTarjetaDestino(r.value.data, r.value.extra);
      }
    });

    if (!c.innerHTML.trim()) {
      mostrarErrorDestinos("No se obtuvo información de los destinos.");
    }

  } catch (err) {
    mostrarErrorDestinos(err.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  cargarDestinosIndex();
});
