// UTILIDADES

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// REGISTRO
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("regNombre").value.trim();
    const email  = document.getElementById("regEmail").value.trim();
    const pass   = document.getElementById("regPass").value.trim();
    const msg    = document.getElementById("registerMsg");

    if (!nombre || !email || !pass) {
      msg.innerHTML = "<span class='text-danger'>Todos los campos son obligatorios</span>";
      return;
    }

    if (!validarEmail(email)) {
      msg.innerHTML = "<span class='text-danger'>Ingresa un correo válido</span>";
      return;
    }

    if (pass.length < 6) {
      msg.innerHTML = "<span class='text-danger'>La contraseña debe tener al menos 6 caracteres</span>";
      return;
    }

    // Verificar si el correo ya está registrado
    const usuarios = obtenerUsuarios();
    const existe = usuarios.find(u => u.email === email);
    if (existe) {
      msg.innerHTML = "<span class='text-danger'>Este correo ya está registrado</span>";
      return;
    }

    // Guardar usuario nuevo en el arreglo de usuarios
    usuarios.push({ nombre, email, pass });
    guardarUsuarios(usuarios);

    // Marcar como logueado y guardar nombre
    localStorage.setItem("usuarioLogueado", "true");
    localStorage.setItem("nombreUsuario", nombre);

    window.location.href = "index.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const pass  = document.getElementById("loginPass").value.trim();
    const msg   = document.getElementById("loginMsg");

    if (!email || !pass) {
      msg.innerHTML = "<span class='text-danger'>Todos los campos son obligatorios</span>";
      return;
    }

    const usuarios = obtenerUsuarios();
    const usuario  = usuarios.find(u => u.email === email && u.pass === pass);

    if (usuario) {
      localStorage.setItem("usuarioLogueado", "true");
      localStorage.setItem("nombreUsuario", usuario.nombre);
      window.location.href = "index.html";
    } else {
      msg.innerHTML = "<span class='text-danger'>Correo o contraseña incorrectos</span>";
    }
  });
}
