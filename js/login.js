<<<<<<< HEAD
// UTILIDADES

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
=======
// login.js — Integrado con backend Spring Boot
>>>>>>> master

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

<<<<<<< HEAD
const ADMIN_DEMO = {
  nombre: "Administrador",
  email: "admin@turaventura.co",
  pass: "Admin123",
  rol: "admin",
};

// REGISTRO
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

=======
// ================================================================
// REGISTRO
// ================================================================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();
>>>>>>> master
    const nombre = document.getElementById("regNombre").value.trim();
    const email  = document.getElementById("regEmail").value.trim();
    const pass   = document.getElementById("regPass").value.trim();
    const msg    = document.getElementById("registerMsg");

    if (!nombre || !email || !pass) {
      msg.innerHTML = "<span class='text-danger'>Todos los campos son obligatorios</span>";
      return;
    }
<<<<<<< HEAD

=======
>>>>>>> master
    if (!validarEmail(email)) {
      msg.innerHTML = "<span class='text-danger'>Ingresa un correo válido</span>";
      return;
    }
<<<<<<< HEAD

=======
>>>>>>> master
    if (pass.length < 6) {
      msg.innerHTML = "<span class='text-danger'>La contraseña debe tener al menos 6 caracteres</span>";
      return;
    }

<<<<<<< HEAD
    // Verificar si el correo ya está registrado
    const usuarios = obtenerUsuarios();
    const existe = usuarios.find(u => u.email === email);
    if (existe) {
      msg.innerHTML = "<span class='text-danger'>Este correo ya está registrado</span>";
      return;
    }

    // Guardar usuario nuevo en el arreglo de usuarios
    usuarios.push({ nombre, email, pass, rol: "cliente" });
    guardarUsuarios(usuarios);

    // Marcar como logueado y guardar nombre
    localStorage.setItem("usuarioLogueado", "true");
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("rolUsuario", "cliente");

    window.location.href = "index.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

=======
    msg.innerHTML = "<span class='text-muted'>Registrando...</span>";
    try {
      await apiRegister(nombre, email, pass);
      const loginData = await apiLogin(email, pass);
      procesarLoginExitoso(loginData, nombre);
      msg.innerHTML = "<span class='text-success'>Cuenta creada. Redirigiendo...</span>";
      setTimeout(() => window.location.href = "index.html", 1000);
    } catch (err) {
      msg.innerHTML = `<span class='text-danger'>${err.message}</span>`;
    }
  });
}

// ================================================================
// LOGIN
// ================================================================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
>>>>>>> master
    const email = document.getElementById("loginEmail").value.trim();
    const pass  = document.getElementById("loginPass").value.trim();
    const msg   = document.getElementById("loginMsg");

    if (!email || !pass) {
      msg.innerHTML = "<span class='text-danger'>Todos los campos son obligatorios</span>";
      return;
    }

<<<<<<< HEAD
    const usuarios = obtenerUsuarios();
    const usuario  = email === ADMIN_DEMO.email && pass === ADMIN_DEMO.pass
      ? ADMIN_DEMO
      : usuarios.find(u => u.email === email && u.pass === pass);

    if (usuario) {
      localStorage.setItem("usuarioLogueado", "true");
      localStorage.setItem("nombreUsuario", usuario.nombre);
      localStorage.setItem("rolUsuario", usuario.rol || "cliente");
      window.location.href = usuario.rol === "admin" ? "admin.html" : "index.html";
    } else {
      msg.innerHTML = "<span class='text-danger'>Correo o contraseña incorrectos</span>";
    }
  });
}
=======
    msg.innerHTML = "<span class='text-muted'>Iniciando sesión...</span>";
    try {
      const loginData = await apiLogin(email, pass);
      procesarLoginExitoso(loginData, null);
      msg.innerHTML = "<span class='text-success'>¡Bienvenido! Redirigiendo...</span>";
      setTimeout(() => {
        window.location.href = esAdmin() ? "admin.html" : "index.html";
      }, 800);
    } catch (err) {
      msg.innerHTML = `<span class='text-danger'>${err.message || "Correo o contraseña incorrectos"}</span>`;
    }
  });
}

// ================================================================
// Procesar respuesta del login — guarda token, userId, rol
// ================================================================
function procesarLoginExitoso(loginData, nombreFallback) {
  const token    = loginData.token;
  const userId   = loginData.userId;       // ← ahora el back lo devuelve
  const username = loginData.username;     // ← y el username también
  const rol      = loginData.rol || "USER";

  // Fallback: si por alguna razón no viene userId, intentar del JWT
  let idFinal = userId;
  if (!idFinal) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      idFinal = payload.userId || payload.id || null;
    } catch (_) {}
  }

  guardarSesionLocal(token, username || nombreFallback, rol, idFinal);
}
>>>>>>> master
