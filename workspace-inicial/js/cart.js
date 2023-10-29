const userID = 25801;
const container = document.getElementById("items");
const articles = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
let map, marker, infoWindow;
const mapDiv = document.getElementById("mapDiv");
const departamentosSelect  = document.getElementById("Departamento");
const ciudadesSelect = document.getElementById("ciudades");
const url = "https://raw.githubusercontent.com/mmejiadeveloper/uruguay-departamentos-y-localidades-json/master/uruguay.json";

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
    showCartInfo(data_cart);
  } catch (error) {
    console.log(error);
  }
}

//Muestra los datos traídos del id del usuario
function showCartInfo(data){
  let userArticles = '';
  for (const article of data.articles) {
    userArticles += `
    <tr>
      <td><img onclick="setProductID(${article.id})" src="${article.image}" class="img-fluid mt-2 cursor-active" style="max-height: 80px;"></img></td>
      <td>${article.name}</td>
      <td>${article.currency} <span>${article.unitCost}</span></td>
      <td><input class="col-lg-2 quantity-input" type="number" min="1" value="1"></td>
      <td><strong>${article.currency} <span>${article.unitCost}</span></strong></td>
    </tr>
    `
    container.insertAdjacentHTML('afterbegin', userArticles);
  };
}

// Agregar evento input a los elementos de cantidad
container.addEventListener("input", function (event) {
  if (event.target.classList.contains("quantity-input")) {
    updateSubtotal(event.target);
  }
});

//Mostrar info del carrito traida del Localstorage
document.addEventListener("DOMContentLoaded", function () {
  //showData() funcion que da error ya que no esta definida.
  userMenu();
  showCartData();
  themeMenu();
  for (const article of articles) {
    container.innerHTML += `
    <tr>
      <td><img onclick="setProductID(${article.id})" src="${article.images[0]}" class="img-fluid mt-2 cursor-active" style="max-height: 80px;"></img></td>
      <td>${article.name}</td>
      <td>${article.currency} <span>${article.cost}</span></td>
      <td><input class="col-lg-2 quantity-input" type="number" min="1" value="1"></td>
      <td><strong>${article.currency} <span>${article.cost}</span></strong></td>
    </tr>
    `
  }
});





// Función para actualizar el subtotal
function updateSubtotal(inputElement) {
  const row = inputElement.closest("tr");
  const costElement = row.querySelector("td:nth-child(3) span");
  const quantity = parseInt(inputElement.value);
  const cost = parseFloat(costElement.textContent);
  const subtotal = quantity * cost;
  const subtotalElement = row.querySelector("td:nth-child(5) span");

  subtotalElement.textContent = subtotal;
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
      ? "Hubo un error al tratar de obtener tu ubicación"
      : "Tu navegador no esta soportado"
  );
  infoWindow.open(map);
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