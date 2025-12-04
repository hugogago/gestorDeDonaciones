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

function donar(nombre, cantidad) {
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Introduce una cantidad válida.");
        return;
    }

    listaDonaciones.push({ nombre: nombre, cantidad: cantidad });

    let zona = document.getElementById("historial");

    let linea = document.createElement("div");
    linea.className = "linea";
    linea.textContent = nombre + " — " + cantidad + "€";
    zona.appendChild(linea);

    let lineas = zona.getElementsByClassName("linea");
    for (let i = 0; i < lineas.length; i++) {
        lineas[i].classList.remove("resaltado");
    }

    for (let i = 0; i < lineas.length; i++) {
        if (lineas[i].textContent.indexOf(nombre) === 0) {
            lineas[i].classList.add("resaltado");
        }
    }

    zona.scrollTop = zona.scrollHeight;
}

document.getElementById("socioSi").addEventListener("click", function () {
    document.getElementById("zonaCodigoSocio").style.display = "block";
});

document.getElementById("socioNo").addEventListener("click", function () {
    document.getElementById("zonaCodigoSocio").style.display = "none";
});

document.getElementById("botonRealizarDonacion").addEventListener("click", validarFormulario);

document.getElementById("botonLimpiarFormulario").addEventListener("click", limpiarFormulario);

function validarFormulario() {
    let nombre = document.getElementById("inputNombre");
    let apellido = document.getElementById("inputApellido");
    let direccion = document.getElementById("inputDireccion");
    let correo = document.getElementById("inputCorreo");

    let errores = [];

    if (nombre.value.length < 2) {
        errores.push("Nombre no válido.");
        document.getElementById("Nombre").style.color = "red";
    } else {
        document.getElementById("Nombre").style.color = "black";
    }

    if (apellido.value.length < 2) {
        errores.push("Apellido no válido.");
        document.getElementById("Apellido").style.color = "red";
    } else {
        document.getElementById("Apellido").style.color = "black";
    }

    if (direccion.value.length < 5) {
        errores.push("Dirección no válida.");
        document.getElementById("Direccion").style.color = "red";
    } else {
        document.getElementById("Direccion").style.color = "black";
    }

    if (!correo.value.includes("@")) {
        errores.push("Correo no válido.");
        document.getElementById("Correo").style.color = "red";
    } else {
        document.getElementById("Correo").style.color = "black";
    }

    if (document.getElementById("socioSi").checked) {
        let codigo = document.getElementById("inputCodigoSocio");
        if (codigo.value.length < 3) {
            errores.push("Código de socio no válido.");
            document.getElementById("socio").style.color = "red";
        } else {
            document.getElementById("socio").style.color = "black";
        }
    }

    if (errores.length > 0) {
        alert("Errores:\n\n" + errores.join("\n"));
        return;
    }

    abrirVentana();
}

function abrirVentana() {
    ventanaResumen = window.open("../html/resumen.html", "ventana", "width=500,height=300");

    ventanaResumen.onload = function () {
        let doc = ventanaResumen.document;

        doc.getElementById("contenidoResumen").innerHTML = obtenerResumen();

        doc.getElementById("volver").addEventListener("click", function () {
            ventanaResumen.close();
        });

        doc.getElementById("terminar").addEventListener("click", function () {
            finalizarDonacion();
            ventanaResumen.close();
        });
    };
}

function obtenerResumen() {
    let texto = "<ul>";

    let nombres = [];

    for (let i = 0; i < listaDonaciones.length; i++) {
        if (!nombres.includes(listaDonaciones[i].nombre)) {
            nombres.push(listaDonaciones[i].nombre);
        }
    }

    for (let i = 0; i < nombres.length; i++) {
        let nombre = nombres[i];
        let total = 0;
        let cantidad = 0;

        for (let j = 0; j < listaDonaciones.length; j++) {
            if (listaDonaciones[j].nombre === nombre) {
                total += listaDonaciones[j].cantidad;
                cantidad++;
            }
        }

        texto += "<li>" + nombre + ": " + total.toFixed(2) + "€ (" + cantidad + " aportaciones)</li>";
    }

    texto += "</ul>";
    return texto;
}

function finalizarDonacion() {
    document.getElementById("historial").innerHTML = "";
    listaDonaciones = [];
    document.getElementById("formularioDonacion").reset();
    document.getElementById("zonaCodigoSocio").style.display = "none";
    alert("Donación finalizada correctamente.");
}

function limpiarFormulario() {
    let form = document.getElementById("formularioDonacion");
    form.reset();

    document.getElementById("zonaCodigoSocio").style.display = "none";

    let etiquetas = ["Nombre", "Apellido", "Direccion", "Correo", "socio"];
    for (let i = 0; i < etiquetas.length; i++) {
        let el = document.getElementById(etiquetas[i]);
        if (el) {
            el.style.color = "black";
        }
    }
}

cargarOrganizaciones();
