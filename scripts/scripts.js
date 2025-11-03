
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
    alert("Introduce una cantidad válida para donar.");
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
