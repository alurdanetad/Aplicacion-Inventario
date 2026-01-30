let modo = "login";

/* Cambia a modo registro */
function activarRegistro() {
    modo = "registro";
    document.getElementById("titulo").innerText = "Registro";
    document.querySelector(".botones button").innerText = "Registrarse";
}

/* Acción principal del formulario */
function accionPrincipal() {
    let correo = document.getElementById("correo").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!correo || !password) {
        alert("Complete todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    /* ===== REGISTRO ===== */
    if (modo === "registro") {
        let existe = usuarios.find(u => u.correo === correo);
        if (existe) {
            alert("El usuario ya existe");
            return;
        }

        usuarios.push({ correo, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Usuario registrado correctamente. Ahora puede iniciar sesión.");

        // Volver a modo login
        modo = "login";
        document.getElementById("titulo").innerText = "Iniciar Sesión";
        document.querySelector(".botones button").innerText = "Iniciar";
        cancelar();
        return;
    }

    /* ===== LOGIN ===== */
    let valido = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (valido) {
        alert("Bienvenido");
        window.location.href = "interface.html";
    }

    else {
        alert("Correo o contraseña incorrectos");
    }
}

/* CANCELAR → vuelve a la página principal */
function cancelar() {
    window.location.href = "login.html"; // ⬅️ cambia aquí si tu página principal tiene otro nombre
}
