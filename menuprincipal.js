document.addEventListener("DOMContentLoaded", () => {

    let usuario = localStorage.getItem("usuarioActivo");

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    let contenedor = document.getElementById("usuarioNavbar");

    let box = document.createElement("div");
    box.className = "usuario-box";

    let avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerText = usuario.charAt(0).toUpperCase();

    let nombre = document.createElement("span");
    nombre.innerText = usuario;

    box.appendChild(avatar);
    box.appendChild(nombre);
    contenedor.appendChild(box);
});

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
}
