let listaOrganizaciones = [];
let listaDonaciones = [];
let ventanaResumen = null;

function cargarOrganizaciones() {
    fetch("http://localhost:3000/organizaciones")
    .then(function (respuesta) { return respuesta.json(); })
    .then(function (datos) {
        listaOrganizaciones = datos;
        crearOrganizaciones();
    });
}

function crearOrganizaciones() {
    let zona = document.getElementById("zonaONG");

    for (let i = 0; i < listaOrganizaciones.length; i++) {
        let organizacion = listaOrganizaciones[i];

        let div = document.createElement("div");
        div.className = "recuadro";

        let imagen = document.createElement("img");
        imagen.src = organizacion.imagen;

        let nombre = document.createElement("div");
        nombre.className = "nombre";
        nombre.textContent = organizacion.nombre;

        let input = document.createElement("input");
        input.type = "number";
        input.placeholder = "Cantidad (€)";
        input.min = 0;

        let boton = document.createElement("button");
        boton.textContent = "Donar";

        boton.addEventListener("click", function () {
            let cantidad = parseFloat(input.value);
            donar(organizacion.nombre, cantidad);
            input.value = "";
        });

        div.appendChild(imagen);
        div.appendChild(nombre);
        div.appendChild(input);
        div.appendChild(boton);
        zona.appendChild(div);
    }
}
