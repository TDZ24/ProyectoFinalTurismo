// Funciones para manejar usuarios en localStorage

function obtenerUsuarios(){
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios){
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function validarEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function marcarInvalido(input, mensaje, contenedor){
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    contenedor.innerHTML = `<div class="text-danger small">${mensaje}</div>`;
}

function marcarValido(input, contenedor){
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    contenedor.innerHTML = "";
}

// REGISTRO
document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("regNombre").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPass").value.trim();

    if(!nombre || !email || !pass){
        document.getElementById("registerMsg").innerHTML =
        "<span class='text-danger'>Todos los campos son obligatorios</span>";
        return;
    }

    const usuario = { nombre, email, pass };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
    localStorage.setItem("usuarioLogueado", "true");

    window.location.href = "index.html";
});


// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if(!email || !pass){
        document.getElementById("loginMsg").innerHTML =
        "<span class='text-danger'>Todos los campos son obligatorios</span>";
        return;
    }

    if(usuarioGuardado && email === usuarioGuardado.email && pass === usuarioGuardado.pass){
        localStorage.setItem("usuarioLogueado", "true");
        window.location.href = "index.html";
    }else{
        document.getElementById("loginMsg").innerHTML =
        "<span class='text-danger'>Datos incorrectos</span>";
    }
});