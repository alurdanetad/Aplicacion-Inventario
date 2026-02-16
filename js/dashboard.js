document.addEventListener("DOMContentLoaded", () => {

    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    let cuerpo = document.querySelector("#tabla-recientes tbody");

    if (!cuerpo) return;

    // Tomar los últimos 3 registros
    let recientes = inventario.slice(-3).reverse();


    if (recientes.length === 0) {
        let fila = document.createElement("tr");
        let celda = document.createElement("td");
        celda.colSpan = 4;
        celda.innerText = "No hay productos ingresados aún";
        fila.appendChild(celda);
        cuerpo.appendChild(fila);
        return;
    }

    recientes.forEach(p => {
        let fila = document.createElement("tr");




        fila.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>${p.fechaRegistro}</td>
        `;

        cuerpo.appendChild(fila);
    });
});
