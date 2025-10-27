let donaciones = [];
let total = 0;



let organizaciones = {
    "Cruz Roja": 5,
    "UNICEF": 7,
    "Médicos Sin Fronteras": 2,
    "Save the Children": 1,
    "WWF": 4,
    "Greenpeace": 8,
    "Caritas": 2,
    "Manos Unidas": 5,
    "Aldeas Infantiles": 6,
    "Fundación Vicente Ferrer": 4
};


function donar(elemento) {
    document.getElementById("resultado").innerHTML = "";

    let nombre = elemento.getAttribute("name");
    let cantidad = organizaciones[nombre];

    if (!cantidad) {
        console.error("La organización " + nombre + " no está registrada.");
        return;
    }


    donaciones.push(nombre);
    total += cantidad;

    console.log("Has donado a: " + nombre + " - Cantidad: " + cantidad + "€");
}

function finalizarDonacion() {
    let resultado = document.getElementById("resultado");

    if (donaciones.length === 0) {
        resultado.innerHTML = "<p>No has realizado ninguna donación.</p>";
        return;
    }

    donaciones.sort().reverse();

    // Contar todas las donaciones
    let resumen = [];
    donaciones.forEach(nombre => {
        resumen[nombre] = (resumen[nombre] || 0) + 1;
    });


    let html = "<h2>Resumen de Donaciones</h2><ul>";

    for (let nombre in resumen) {
        html += `<li>${nombre} ---- ${resumen[nombre]} aportación(es)</li>`;
    }

    html += "</ul>";

    const media = (total / donaciones.length).toFixed(2);
    html += "<p>Donación final: " + total + "€</p>";
    html += "<p>Donación media: " + media + "€ por aportación</p>";

    resultado.innerHTML = html;


    donaciones = [];
    total = 0;
}
