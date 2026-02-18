/* ===============================
   CARGAR DATOS EN LA TABLA
================================ */
function cargarDatos() {
    let datos = JSON.parse(localStorage.getItem("inventario")) || [];
    let tabla = document.getElementById("tabla");

    // Limpiar filas anteriores (evita duplicados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    datos.forEach(p => {
        let fila = tabla.insertRow();

        fila.insertCell(0).innerText = p.codigo;
        fila.insertCell(1).innerText = p.nombre;
        fila.insertCell(2).innerText = p.cantidad;
        fila.insertCell(3).innerText = p.unidad;
        fila.insertCell(4).innerText = p.centro;
        fila.insertCell(5).innerText = p.almacen;
        fila.insertCell(6).innerText = p.lote || "Sin lote";
        fila.insertCell(7).innerText = p.fecha;
        fila.insertCell(8).innerText = p.caducidad;
        fila.insertCell(9).innerText = p.usuario || "—";
        fila.insertCell(10).innerText = p.fechaRegistro || "—";
    });
}

/* ===============================
   BORRAR INVENTARIO
================================ */
function borrarInventario() {
    if (confirm("¿Seguro que desea borrar todo el inventario?")) {
        localStorage.removeItem("inventario");
        cargarDatos();
    }
}

/* ===============================
   VOLVER A INVENTARIO
================================ */
function volver() {
    window.location.href = "inventario.html";
}

/* ===============================
   DESCARGAR EXCEL
================================ */
function descargarExcel() {
    let datos = JSON.parse(localStorage.getItem("inventario")) || [];

    let hoja = XLSX.utils.json_to_sheet(datos.map(p => ({
        Codigo: p.codigo,
        Nombre: p.nombre,
        Cantidad: p.cantidad,
        Unidad: p.unidad,
        Centro: p.centro,
        almacen: p.centro,
        Lote: p.lote || "Sin lote",
        Ingreso: p.fecha,
        Caducidad: p.caducidad,
        Usuario: p.usuario || "",
        "Fecha Registro": p.fechaRegistro || ""
    })));

    let libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Reporte");
    XLSX.writeFile(libro, "reporte.xlsx");
}

/* ===============================
   EJECUCIÓN INICIAL
================================ */
document.addEventListener("DOMContentLoaded", cargarDatos);
