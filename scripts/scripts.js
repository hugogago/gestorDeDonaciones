let organizaciones = [];
let donaciones = [];
let ventana = null;

fetch("../datos/donaciones.json")
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos) {
        organizaciones = datos.organizaciones;
        console.log("Datos del JSON cargados correctamente.");
    })
    .catch(function(error) {
        console.log("Error al cargar el JSON: " + error);
    });


function donar(imagen) {
    let nombre = imagen.getAttribute("name");
    let input = document.getElementById(nombre);
    let cantidad = parseFloat(input.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        
        return;
    }


    donaciones.push({ nombre: nombre, cantidad: cantidad });


    mostrarHistorial(nombre, cantidad);


    input.value = "";
}

//panel lateral 
function mostrarHistorial(nombre, cantidad) {
    let historial = document.getElementById("historial");


    let linea = document.createElement("div");
    linea.className = "linea";
    linea.textContent = nombre + " — " + cantidad + "€";


    historial.appendChild(linea);

    // quitar el resaltado anterior
    let todas = historial.getElementsByClassName("linea");
    for (let i = 0; i < todas.length; i++) {
        todas[i].classList.remove("resaltado");
    }

    // resaltar la linea 
    for (let i = 0; i < todas.length; i++) {
        if (todas[i].textContent.indexOf(nombre) === 0) {
            todas[i].classList.add("resaltado");
        }
    }
}


function finalizarDonacion() {
    let resultado = document.getElementById("resultado");

    if (donaciones.length === 0) {
        resultado.innerHTML = "<p>No has realizado ninguna donación.</p>";
        return;
    }

    let fecha = new Date();
    let texto = "<h2>Resumen de Donaciones</h2>";
    texto += "<p>Fecha: " + fecha.toLocaleDateString() + " " + fecha.toLocaleTimeString() + "</p><ul>";


    let nombres = [];


    for (let i = 0; i < donaciones.length; i++) {
        let nombre = donaciones[i].nombre;


        let encontrado = false;
        for (let j = 0; j < nombres.length; j++) {
            if (nombres[j] === nombre) {
                encontrado = true;
            }
        }


        if (!encontrado) {
            nombres.push(nombre);
        }
    }


    nombres.sort();
    nombres.reverse();


    let totalGlobal = 0;
    let totalDonaciones = 0;


    for (let i = 0; i < nombres.length; i++) {
        let nombre = nombres[i];
        let suma = 0;
        let contador = 0;


        for (let j = 0; j < donaciones.length; j++) {
            if (donaciones[j].nombre === nombre) {
                suma += donaciones[j].cantidad;
                contador++;
            }
        }

        let media = suma / contador;

        texto += "<li>" + nombre + " ---- " + contador + " donaciones --- " +
            media.toFixed(2) + "€ --- " + suma.toFixed(2) + "€</li>";

        totalGlobal += suma;
        totalDonaciones += contador;
    }

    texto += "</ul>";
    texto += "<p><strong>Aporte total:</strong> " + Math.floor(totalGlobal) + " €</p>";
    texto += "<p><strong>Aporte medio:</strong> " + (totalGlobal / totalDonaciones).toFixed(3) + " €/donación</p>";
    // to fixed para redondear a 3 decimales y math floor para redondear hacia abajo --> POO y objetos nativos 
    resultado.innerHTML = texto;


    mostrarVentana(nombres);


    setTimeout(function() {
        document.getElementById("historial").innerHTML = "";
        resultado.innerHTML = "";
        donaciones = [];
        if (ventana && !ventana.closed) {
            ventana.close();
        }
    }, 10000);
}


function mostrarVentana(nombres) {
    let texto = "";

    for (let i = 0; i < nombres.length; i++) {
        let nombre = nombres[i];
        let org = null;

        // Buscamos la organización en el JSON
        for (let j = 0; j < organizaciones.length; j++) {
            if (organizaciones[j].nombre === nombre) {
                org = organizaciones[j];
            }
        }


        if (org) {
            if (org.acogida !== undefined) {
                texto += org.nombre + " trabaja con personas, enfocada en la " + org.rangoEdad + ". ";
                if (org.acogida === true) {
                    texto += "Sí tramita acogidas.<br>";
                } else {
                    texto += "No tramita acogidas.<br>";
                }
            } else if (org.multiraza !== undefined) {
                texto += org.nombre + " trabaja con animales a nivel " + org.ambito + ".<br>";
            }
        }
    }

    // Abrimos ventana emergente
    ventana = window.open("", "info", "width=500,height=400");
    ventana.document.write("<h3>Información de las Organizaciones</h3>" + texto);
}