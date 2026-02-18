/* ===============================
   ALMACENES DISPONIBLES
================================ */
const almacenesDisponibles = ["1000", "1100", "1200", "1300"];

/* ===============================
   CARGAR ALMACENES EN SELECTS
================================ */
function cargarAlmacenes() {

    let selectA = document.getElementById("almacenA");
    let selectB = document.getElementById("almacenB");

    selectA.innerHTML = '<option value="">Seleccione</option>';
    selectB.innerHTML = '<option value="">Seleccione</option>';

    almacenesDisponibles.forEach(almacen => {

        let optionA = document.createElement("option");
        optionA.value = almacen;
        optionA.textContent = "Almacén " + almacen;

        let optionB = document.createElement("option");
        optionB.value = almacen;
        optionB.textContent = "Almacén " + almacen;

        selectA.appendChild(optionA);
        selectB.appendChild(optionB);

    });

}

/* ===============================
   VALIDAR ALMACENES
================================ */
function validarAlmacenes() {

    let origen = document.getElementById("almacenA").value;
    let destino = document.getElementById("almacenB").value;

    if (!origen) {
        alert("Seleccione Almacén Origen");
        return false;
    }

    if (!destino) {
        alert("Seleccione Almacén Destino");
        return false;
    }

    if (!almacenesDisponibles.includes(origen) ||
        !almacenesDisponibles.includes(destino)) {
        alert("Almacén no válido");
        return false;
    }

    if (origen === destino) {
        alert("No se puede mover al mismo almacén");
        return false;
    }

    return true;
}

/* ===============================
   GUARDAR MOVIMIENTO
================================ */
function guardarProducto() {

    if (!validarAlmacenes()) return;

    let codigo = document.getElementById("codigo").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let cantidad = Number(document.getElementById("cantidad").value);
    let unidad = document.getElementById("unidad").value;
    let almacenA = document.getElementById("almacenA").value;
    let almacenB = document.getElementById("almacenB").value;
    let lote = document.getElementById("lote").value.trim() || "Sin lote";
    let fecha = document.getElementById("fecha").value;
    let caducidad = document.getElementById("caducidad").value;

    if (!codigo || !cantidad || !unidad || !almacenA || !almacenB) {
        alert("Complete los campos obligatorios");
        return;
    }

    let movimientos = JSON.parse(localStorage.getItem("movimientosAlmacen")) || [];

    movimientos.push({
        codigo,
        nombre,
        cantidad,
        unidad,
        almacenOrigen: almacenA,
        almacenDestino: almacenB,
        lote,
        fecha,
        caducidad,
        fechaMovimiento: new Date().toLocaleDateString("es-CL")
    });

    localStorage.setItem("movimientosAlmacen", JSON.stringify(movimientos));

    alert("Movimiento guardado correctamente");

}

/* ===============================
   INICIAR AL CARGAR PAGINA
================================ */
document.addEventListener("DOMContentLoaded", () => {
    cargarAlmacenes();
});
