let datos = JSON.parse(localStorage.getItem("ultimoIngreso"));

if (!datos) {
    document.body.innerHTML = "<h3>No hay datos para mostrar</h3>";
} else {
    document.getElementById("contenido").innerHTML = `
        <p><b>Código:</b> ${datos.codigo}</p>
        <p><b>Nombre:</b> ${datos.nombre}</p>
        <p><b>Unidad:</b> ${datos.unidad}</p>
        <p><b>Lote:</b> ${datos.lote}</p>
        <p><b>Cantidad:</b> ${datos.cantidad}</p>
        <p><b>Fecha de Ingreso:</b> ${datos.fechaIngreso}</p>
        <p><b>Fecha de Caducidad:</b> ${datos.caducidad}</p>
        <p><b>Usuario:</b> ${datos.usuario}</p>
        <p><b>Fecha de Registro:</b> ${datos.fechaRegistro}</p>
    `;
}
