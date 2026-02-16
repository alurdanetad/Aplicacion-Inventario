/* ===== VALIDAR SESIÓN ===== */
let usuario = localStorage.getItem("usuarioActivo");
if (!usuario) {
    window.location.href = "login.html";
}

/* ===== BUSCAR CÓDIGO ===== */

function buscarCodigo() {
    let codigo = document.getElementById("codigo").value.trim();
    let nombre = document.getElementById("nombre");
    let unidad = document.getElementById("unidad");

    let lista = JSON.parse(localStorage.getItem("inventario")) || [];
    let encontrado = lista.find(p => p.codigo === codigo);

    if (encontrado) {
        nombre.value = encontrado.nombre;
        unidad.value = encontrado.unidad;
        nombre.disabled = true;
        unidad.disabled = true;
    } else {
        nombre.value = "";
        unidad.value = "";
        nombre.disabled = false;
        unidad.disabled = false;
    }
}

/* ===============================
   GUARDAR PRODUCTO
================================ */
function guardarProducto() {
    let codigo = document.getElementById("codigo").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let unidad = document.getElementById("unidad").value;
    let lote = document.getElementById("lote").value.trim() || "Sin lote";
    let cantidad = Number(document.getElementById("cantidad").value);
    let fecha = document.getElementById("fecha").value;
    let caducidad = document.getElementById("caducidad").value;

    let usuario = localStorage.getItem("usuarioActivo");
    let fechaRegistro = new Date().toLocaleDateString("es-CL");


    if (!codigo || !nombre || !unidad || cantidad <= 0 || !fecha || !caducidad) {
        alert("Complete todos los campos obligatorios.");
        return;
    }

    let lista = JSON.parse(localStorage.getItem("inventario")) || [];

    /* 🔑 MISMO CÓDIGO + MISMO LOTE */
    let encontrado = lista.find(p =>
        p.codigo === codigo && p.lote === lote
    );

    if (encontrado) {
        encontrado.cantidad += cantidad;
        encontrado.usuario = usuario;
        encontrado.fechaRegistro = fechaRegistro;
    } else {
        lista.push({
            codigo,
            nombre,
            unidad,
            lote,
            cantidad,
            fecha,
            caducidad,
            usuario,
            fechaRegistro
        });
    }

    localStorage.setItem("inventario", JSON.stringify(lista));

    /* ===============================
       ENVIAR DATOS AL POPUP
    ================================ */
    localStorage.setItem("ultimoIngreso", JSON.stringify({
        codigo,
        nombre,
        unidad,
        lote,
        cantidad,
        fechaIngreso: fecha,
        fechaRegistro,
        caducidad,
        usuario
    }));

    window.open("popup.html", "_blank", "width=450,height=460");

    /* ===============================
       LIMPIAR FORMULARIO
    ================================ */
    document.querySelectorAll("input").forEach(i => i.value = "");
    document.getElementById("unidad").value = "";
    document.getElementById("nombre").disabled = false;
    document.getElementById("unidad").disabled = false;
}


