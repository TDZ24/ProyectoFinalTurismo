// --- DATOS DE DESTINOS (imágenes de Unsplash, free) ----------
const destinos = [
  {
    nombre: "Cabo San Juan, Colombia",
    descripcion: "Transporte terrestre, entrada al Tayrona, seguro de asistencia medica, guia profesional.",
    precio: "Desde $150.000",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1538821169352-a455f1f448b2?w=600&q=80",
    tag: "Más vendido"
  },
  {
    nombre: "Palomino-Guajira, Colombia",
    descripcion: "Transporte terrestre, desayuno, almuerzo, seguro de asistencia medica, guia profesional.",
    precio: "Desde $110.000",
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1708526499808-46793ea32022?w=600&q=80",
    tag: "Aventura"
  },
  {
    nombre: "Bahia Concha, Colombia",
    descripcion: "Transporte chiva, seguro de asistencia medica, almuerzo, guia profesional.",
    precio: "Desde $100.000",
    rating: 4.9,
    imagen: "https://images.unsplash.com/photo-1595101445719-aaff4a444631?w=600&q=80",
    tag: "Playa"
  },
  {
    nombre: "Minca-Taganga, Colombia",
    descripcion: "Transporte terrestre, desayuno, almuerzo, seguro de asistencia medica, transporte lancha, guia profesional.",
    precio: "Desde $120.000",
    rating: 4.7,
    imagen: "https://images.unsplash.com/photo-1708716175154-32344ec0868a?w=600&q=80",
    tag: "Naturaleza"
  },
  {
    nombre: "Cartagena-Baru, Colombia",
    descripcion: "Transporte terrestre, desayuno, almuerzo, historia-playa, seguro de asistencia medica, guia profesional.",
    precio: "Desde $150.000",
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1715503485391-e34011335c66?w=600&q=80",
    tag: "Top destino"
  },
  {
    nombre: "Playa Blanca, Colombia",
    descripcion: "Transporte lancha, Seguro de asistencia medica, almuerzo, entrada al acuario.",
    precio: "Desde $134.000",
    rating: 4.6,
    imagen: "https://plus.unsplash.com/premium_photo-1683214474059-b57007fc4d49?w=600&q=80",
    tag: "Relax"
  },
  {
    nombre: "Remanso-Taganga, Colombia",
    descripcion: "Transporte terrestre, almuerzo, careteo mas fotos, seguro de asistencia medica, guia profesional.",
    precio: "Desde $100.000",
    rating: 4.8,
    imagen: "https://images.unsplash.com/photo-1549025227-2fd0b499aaae?w=600&q=80",
    tag: "Snorkel"
  },
  {
    nombre: "Playa Cristal, Colombia",
    descripcion: "Transporte terrestre, entrada al Tayrona, transporte maritimo, seguro de asistencia medica, guia profesional.",
    precio: "Desde $150.000",
    rating: 4.8,
    imagen: "https://plus.unsplash.com/premium_photo-1691675469394-f843e044e340?w=600&q=80",
    tag: "Playa"
  },
    {
    nombre: "Buritaca, Colombia",
    descripcion: "Transporte chiva, almuerzo, seguro de asistencia medica, guia profesional.",
    precio: "Desde $110.000",
    rating: 4.8,
    imagen: "https://plus.unsplash.com/premium_photo-1664117187513-ef8d723a0a69?w=600&q=80",
    tag: "Rio y mar"
  },
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
