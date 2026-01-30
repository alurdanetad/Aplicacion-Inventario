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

function guardarProducto() {
    let codigo = document.getElementById("codigo").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let unidad = document.getElementById("unidad").value;
    let lote = document.getElementById("lote").value.trim();
    let cantidad = Number(document.getElementById("cantidad").value);
    let fecha = document.getElementById("fecha").value;
    let caducidad = document.getElementById("caducidad").value;

    if (!codigo || !nombre || !unidad || cantidad <= 0 || !fecha || !caducidad) {
        alert("Complete todos los campos obligatorios.");
        return;
    }

    let lista = JSON.parse(localStorage.getItem("inventario")) || [];

    // 🔥 VALIDACIÓN CLAVE: MISMO CÓDIGO + MISMO LOTE
    let encontrado = lista.find(p =>
        p.codigo === codigo && (p.lote || "") === (lote || "")
    );

    if (encontrado) {
        encontrado.cantidad += cantidad;
    } else {
        lista.push({
            codigo,
            nombre,
            unidad,
            lote: lote || "Sin lote",
            cantidad,
            fecha,
            caducidad
        });
    }

    localStorage.setItem("inventario", JSON.stringify(lista));

    let ventana = window.open("", "_blank", "width=420,height=420");
    ventana.document.write(`
        <html>
        <head>
            <title>Producto Registrado</title>
            <style>
                body{font-family:Arial;background:#1f4037;padding:20px;}
                .box{background:white;padding:20px;border-radius:10px;}
                h2{text-align:center;color:#1f4037;}
            </style>
        </head>
        <body>
            <div class="box">
                <h2>Producto Registrado</h2>
                <p><b>Código:</b> ${codigo}</p>
                <p><b>Nombre:</b> ${nombre}</p>
                <p><b>Unidad:</b> ${unidad}</p>
                <p><b>Lote:</b> ${lote || "Sin lote"}</p>
                <p><b>Cantidad Agregada:</b> ${cantidad}</p>
                <p><b>Ingreso:</b> ${fecha}</p>
                <p><b>Caducidad:</b> ${caducidad}</p>
            </div>
        </body>
        </html>
    `);

    document.querySelectorAll("input").forEach(i => i.value = "");
    document.getElementById("unidad").value = "";
    document.getElementById("nombre").disabled = false;
    document.getElementById("unidad").disabled = false;
}
