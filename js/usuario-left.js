document.addEventListener("DOMContentLoaded", () => {

    let usuario = localStorage.getItem("usuarioActivo");

    // 🔐 proteger sesión
    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    // contenedor izquierdo
    let box = document.createElement("div");
    box.className = "usuario-left";

    // avatar
    let avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerText = usuario.charAt(0).toUpperCase();

    // correo
    let nombre = document.createElement("span");
    nombre.innerText = usuario;

    box.appendChild(avatar);
    box.appendChild(nombre);

    document.body.appendChild(box);

});
