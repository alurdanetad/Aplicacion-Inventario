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
        // ✅ GUARDAR USUARIO CONECTADO
        localStorage.setItem("usuarioActivo", correo);

        window.location.href = "menuprincipal.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
}

/* CANCELAR */
function cancelar() {
    window.location.href = "index.html";
}
