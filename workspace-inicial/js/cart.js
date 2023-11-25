const userID = 25801;
const container = document.getElementById("items");
const articles = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
let map, marker, infoWindow;
const mapDiv = document.getElementById("mapDiv");
const departamentosSelect  = document.getElementById("Departamento");
const ciudadesSelect = document.getElementById("ciudades");
const url = "https://raw.githubusercontent.com/mmejiadeveloper/uruguay-departamentos-y-localidades-json/master/uruguay.json";
const precioSubtotal = document.getElementById("precioSubtotal");
const costoDeEnvio = document.getElementById("precioCostoDeEnvio");
const precioTotal = document.getElementById("precioTotal");
const tipoDeCambio = 40;

const premium = document.querySelector("#option1");
const express = document.querySelector("#option2");
const standad = document.querySelector("#option3");
const tipoEnvio = document.querySelector("#opciones");
let elCostoDelEnvio = costoDeEnvio.value;

//Fecth Carrito
function getCartInfo(data) {
  return new Promise((resolve, reject) => {
    fetch(data)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  });
}

// Mostrar información del carrito
async function showCartData() {
  try {
    data_cart = await getCartInfo(CART_INFO_URL + userID + ".json");
  } catch (error) {
    console.log(error);
  }
}


// Agregar evento input a los elementos de cantidad
container.addEventListener("input", function (event) {
  if (event.target.classList.contains("quantity-input")) {
    updateSubtotal(event.target);

    // Obtén el valor del input y el ID del producto
    const quantity = event.target.value;
    const row = event.target.closest("tr");
    const productId = row.dataset.productId || article.id;

    // Almacena la cantidad en localStorage
    localStorage.setItem(`quantity_${productId}`, quantity);
  }
});

//Mostrar info del carrito traida del Localstorage
document.addEventListener("DOMContentLoaded", function () {
  userMenu();
  showCartData();
  themeMenu();

  // Recorre los productos y realiza la conversión de UYU a USD (si esta en UYU)
  for (const article of articles) {
    const storedQuantity = localStorage.getItem(`quantity_${article.id}`);
    
    if (article.currency === "UYU") {
      article.cost /= 40; // Pasa UYU a USD
      article.currency = "USD"; // Actualiza la moneda a "USD"
    }
  
    container.innerHTML += `
    <tr data-product-id="${article.id}">
      <td><img onclick="setProductID(${article.id})" src="${article.images[0]}" class="img-fluid mt-2 cursor-active" style="max-height: 80px;"></img></td>
      <td>${article.name}</td>
      <td class="">${article.currency} <span>${article.cost}</span></td>
      <td><input class="col-5 col-sm-5 col-lg-2 quantity-input" type="number" min="1" value="${storedQuantity || article.quantity}"></td>
      <td><strong>${article.currency}</strong> <strong><span class="costArt">${article.cost}</span></strong></td>
      <td><button class="btn btn-danger" onclick="deleteArticle(${article.id})"><i class="fas fa-trash-alt"></i></button></td>
    </tr>
    `
  const quantityInput = container.querySelector(`tr[data-product-id="${article.id}"] .quantity-input`);
  updateSubtotal(quantityInput);
  }
  
  sumAllCosts();
  showCostoDeEnvio()
  showTotalCarrito()
});

// Agregar evento input a los elementos de cantidad
container.addEventListener("input", function (event) {
  if (event.target.classList.contains("quantity-input")) {
    updateSubtotal(event.target);
  }

   // Se obtiene el valor del input y el ID del producto
   const quantity = event.target.value;
   const row = event.target.closest("tr");
   const productId = row.dataset.productId || article.id;

   // Almacena la cantidad en localStorage
   localStorage.setItem(`quantity_${productId}`, quantity);

  showTotalCarrito()
  showCostoDeEnvio()
});

// Función para actualizar el subtotal
function updateSubtotal(inputElement) {
  const row = inputElement.closest("tr");
  const costElement = row.querySelector("td:nth-child(3) span");
  const quantity = parseInt(inputElement.value); //parseInt(articles.quantity)
  const cost = parseFloat(costElement.textContent);
  const subtotal = quantity * cost;
  const subtotalElement = row.querySelector("td:nth-child(5) span");

  subtotalElement.textContent = subtotal;
  sumAllCosts()
};

let totalPreciosArray = 0;
//funcion que suma todos los elementos
function sumAllCosts(){
  var todosLosPrecios = document.getElementsByClassName("costArt");

  var preciosArray = [];
  //recorre todos los elementos y obtiene el contenido como número
  for (var i = 0; i < todosLosPrecios.length; i++){
    var preciosString = todosLosPrecios[i].innerHTML;
    var precio = parseInt(preciosString);
    preciosArray.push(precio)

  };
 
  //suma todos los precios del array
  totalPreciosArray = preciosArray.reduce((a, b) => a + b, 0);
  precioSubtotal.innerHTML = "USD " + totalPreciosArray;

};

fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);
    data.forEach(departamento => {
        const option = document.createElement('option');
        option.value = departamento.departamento;
        option.textContent = departamento.departamento;
        departamentosSelect.appendChild(option);
    
});
// Agregar un evento de cambio al elemento <select> de departamentos
departamentosSelect.addEventListener('change', () => {
    // Obtener el departamento seleccionado
    const selectedDepartamento = departamentosSelect.value;

    // Llenar el elemento <select> de ciudades con las ciudades del departamento seleccionado
    ciudadesSelect.innerHTML = ''; // Limpiar opciones anteriores

    const departamento = data.find(d => d.departamento === selectedDepartamento);
    if (departamento) {
        departamento.ciudades.forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad;
            option.textContent = ciudad;
            ciudadesSelect.appendChild(option);
        });
    }
});
});

function initMap(){
   map = new google.maps.Map(mapDiv, {
        center: {lat: -33.61, lng:-63.61 },
        zoom: 6,
   })
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
    locationButton.textContent = "Mi ubicación";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const myPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }

                infoWindow.setPosition(myPosition);
                infoWindow.setContent("Mi ubicación");
                infoWindow.open(map);
                map.setCenter(myPosition);
            }, () => handleLocationError(true, infoWindow, map.getCenter()));
        } else {
            // Navegador no soportado
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
    
    map.addListener("click", (event) => {
        addMarker(event.latLng);
    })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Hubo un error al tratar de obtener tuG ubicación"
      : "Tu navegador no esta soportado"
  );
  infoWindow.open(map);F
}

function addMarker(position) {
    if (marker) {
        marker.setMap(null);
    }
    
     marker = new google.maps.Marker({
        position,
        map,
    })

    marker.setMap(map);
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


//Funcion selecciona tarjeta de credito
function tarjeta() {
  document.getElementById("cuentaban").disabled = true;
  document.getElementById("cardNumber").disabled = false;
  document.getElementById("expiry").disabled = false;
  document.getElementById("expiry1").disabled = false;
  document.getElementById("cvv").disabled = false;
  const miDiv = document.getElementById("miDiv");
  var cuentabanco = document.getElementById("cuentaban")

  cuentabanco.value = "";
  miDiv.innerHTML= "";
  miDiv.textContent ="Tarjeta de crédito";
}
//Funcion selecciona cuenta bancaria
function cuentaBancaria() {

  document.getElementById("cuentaban").disabled = false;
  document.getElementById("cardNumber").disabled = true;
  document.getElementById("expiry").disabled = true;
  document.getElementById("expiry1").disabled = true;
  document.getElementById("cvv").disabled = true;
  var numerito = document.getElementById("cardNumber");
  var expiracion = document.getElementById("expiry");
  var elcvv = document.getElementById("cvv");
  const miDiv = document.getElementById("miDiv");
  elcvv.value = "";
  expiracion.value = "";
  numerito.value = "";
  miDiv.innerHTML= "";
  miDiv.textContent ="Transferencia bancaria";
}

function validarTipoDeEnvio() { //funcion que comprueba si esta seleccionado el tipo de envio.
  var valid = false;
  var opciones = document.formulario.options;

  for (var i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      valid = true;
      break;
    }
  }

  if (valid) { //si no hay ningun check muestra el mensaje
    document.getElementById("mensajeNoTipoEnvio").style.display = "none";
  }
  else {
    document.getElementById("mensajeNoTipoEnvio").style.display = "block";
  }
}

document.getElementById("btnSubmit").addEventListener("click", function (event) {
  validarTipoDeEnvio();
});

var radios = document.forms["formulario"].elements["options"]; //agrega evento a todos los botones radio.
for (var i = 0; i < radios.length; i++) {
  radios[i].onclick = function () {
    document.getElementById("mensajeNoTipoEnvio").style.display = "none";
  }
}

// Función para eliminar un artículo del carrito
function deleteArticle(id) {
  const cart = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
  const newCart = cart.filter((article) => article.id !== id);
  localStorage.removeItem(`quantity_${id}`); //Remueve la cantidad guardada, al volvel a agregar al carro, se carga con 1
  localStorage.setItem("productosSeleccionados", JSON.stringify(newCart));
  location.reload(); // Recarga la página y actualiza la vista del carrito
}

tipoEnvio.addEventListener("change", () => {
  showCostoDeEnvio()
  showTotalCarrito()
});

function showCostoDeEnvio() {
  if (premium.checked) {
    elCostoDelEnvio = (totalPreciosArray * 0.15);
  } else if (express.checked) {
    elCostoDelEnvio = (totalPreciosArray * 0.07);
  } else if (standad.checked) {
    elCostoDelEnvio = (totalPreciosArray * 0.05);
  }

  costoDeEnvio.innerHTML = "USD " +  elCostoDelEnvio.toFixed();
}

function showTotalCarrito() {
  precioTotal.innerHTML = "USD " + (totalPreciosArray + elCostoDelEnvio) ;
}

// function showAlertSuccess() {
//   document.getElementById("alert-success").classList.add("show");
//   setTimeout(() => {
//       document.getElementById("alert-success").classList.remove("show")
//   }, 3000);

// }

// if (valid) { //si no hay ningun check muestra el mensaje
//   document.getElementById("mensajeNoMetodoSeleccionado").style.display = "none";
// }
// else {
//   document.getElementById("mensajeNoMetodoSeleccionado").style.display = "block";
// }

// document.getElementById("btnSubmit").addEventListener("click", function (event) {
// validarTipoDeEnvio();
// });
