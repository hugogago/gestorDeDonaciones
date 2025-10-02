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

//esto se ejecuta al hacer click en alguna imagen
function donar(elemento) {
    //pregunta si se puede cambiar el .alt por "name" en el html
    let nombre = elemento.getAttribute("name");
    let cantidad = organizaciones[nombre];

    if (!cantidad) {
        console.error(`La organización "${nombre}" no está registrada.`);
        alert(`La organización "${nombre}" no está registrada.`);
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


    //contar todas las donaciones
    let resumen = {};
    donaciones.forEach(nombre => {
        resumen[nombre] = (resumen[nombre] || 0) + 1;
    });


      // Ordenar inverso alfabético
      const ordenado = Object.keys(resumen).sort().reverse();

      // Construir HTML del resumen
      let html = "<h2>Resumen de Donaciones</h2><ul>";
      ordenado.forEach(nombre => {
          html += `<li>${nombre} ---- ${resumen[nombre]} aportación(es)</li>`;
      });
      html += "</ul>";
  
      const media = (total / donaciones.length).toFixed(2);
      html += `<p><strong>Donación final:</strong> ${total} €</p>`;
      html += `<p><strong>Donación media:</strong> ${media} €/aportación</p>`;
  
      resultado.innerHTML = "";
  
      // Reiniciar variables para empezar de nuevo
      donaciones = [];
      total = 0;
}


