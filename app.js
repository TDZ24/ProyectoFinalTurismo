// --- DATOS DE DESTINOS (imágenes de Unsplash, free) ----------
const destinos = [
  {
    nombre: "Cartagena, Colombia",
    descripcion: "Murallas coloniales, playas y cultura caribeña.",
    precio: "Desde $350.000",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tag: "Más vendido"
  },
  {
    nombre: "Medellín, Colombia",
    descripcion: "La ciudad de la eterna primavera te espera.",
    precio: "Desde $180.000",
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce5?w=600&q=80",
    tag: "Oferta"
  },
  {
    nombre: "San Andrés",
    descripcion: "Mar de los siete colores y arrecifes de coral.",
    precio: "Desde $890.000",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    tag: "Popular"
  },
  {
    nombre: "Salento, Quindío",
    descripcion: "Valle del Cocora y café de origen colombiano.",
    precio: "Desde $220.000",
    rating: 4.7,
    imagen: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    tag: "Naturaleza"
  },
  {
    nombre: "Tayrona, Santa Marta",
    descripcion: "Selva tropical que besa el mar Caribe.",
    precio: "Desde $310.000",
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    tag: "Aventura"
  },
  {
    nombre: "Bogotá, Colombia",
    descripcion: "Gastronomía, arte y arquitectura en la capital.",
    precio: "Desde $150.000",
    rating: 4.6,
    imagen: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    tag: "Ciudad"
  }
];

const stats = [
  { icono: "fas fa-users", valor: "12,000+", label: "Viajeros felices" },
  { icono: "fas fa-map-marked-alt", valor: "85+", label: "Destinos disponibles" },
  { icono: "fas fa-star", valor: "4.9/5", label: "Calificación promedio" },
  { icono: "fas fa-headset", valor: "24/7", label: "Soporte al cliente" }
];

function cargarHero() {
  const heroSection = document.getElementById("hero");
  const heroImg = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80";
  heroSection.style.backgroundImage = `url('${heroImg}')`;
}

function renderDestinos() {
  const container = document.getElementById("destinos-container");
  if (!container) return;

  container.innerHTML = destinos.map(d => `
    <div class="col-sm-6 col-lg-4">
      <div class="destino-card">
        <div style="position:relative;">
          <img src="${d.imagen}" alt="${d.nombre}" loading="lazy"/>
          <span class="badge-precio" style="position:absolute;top:12px;left:12px;">
            ${d.tag}
          </span>
        </div>
        <div class="destino-info">
          <div class="d-flex justify-content-between align-items-start">
            <h5>${d.nombre}</h5>
            <span class="text-warning fw-bold">
              <i class="fas fa-star"></i> ${d.rating}
            </span>
          </div>
          <p class="text-muted" style="font-size:0.87rem;">${d.descripcion}</p>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <strong style="color:var(--accent);">${d.precio}</strong>
            <button class="btn btn-sm btn-outline-primary rounded-pill">
              Reservar <i class="fas fa-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderStats() {
  const container = document.getElementById("stats-container");
  if (!container) return;

  container.innerHTML = stats.map(s => `
    <div class="col-6 col-md-3 stat-item">
      <i class="${s.icono} fa-2x mb-2 opacity-75"></i>
      <h2>${s.valor}</h2>
      <p class="opacity-75">${s.label}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  cargarHero();
  renderDestinos();
  renderStats();
  console.log("✅ TurAventura cargado correctamente");
});
