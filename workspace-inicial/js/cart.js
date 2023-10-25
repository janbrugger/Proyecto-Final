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

//Mostrar info del carrito traida del Localstorage
document.addEventListener("DOMContentLoaded", function () {
  //showData() funcion que da error ya que no esta definida.
  userMenu();
  showCartData();
  for (const article of articles) {
    container.innerHTML += `
    <tr>
      <td><img onclick="setProductID(${article.id})" src="${article.images[1]}" class="img-fluid mt-2 cursor-active" style="max-height: 80px;"></img></td>
      <td>${article.name}</td>
      <td>${article.currency} <span>${article.cost}</span></td>
      <td><input class="col-lg-2 quantity-input" type="number" min="1" value="${article.quantity}" ></td>
      <td><strong>${article.currency} <span>${article.cost}</span></strong></td>
    </tr>
    `
    showSubTotalCarrito(article.cost)
  }
});
/*
function changeCounter(article) {
  const subtotalElement = ;
}
*/
const contadorKey = 'contador'; // Clave para el contador en el localStorage
let contador = parseInt(localStorage.getItem((articles.quantity))) || 0; // Recuperar el valor del contador del localStorage o usar 0 si no existe


// Agregar evento input a los elementos de cantidad
container.addEventListener("input", function (event) {
  if (event.target.classList.contains("quantity-input")) {
    updateSubtotal(event.target);
  }
});


// Función para actualizar el subtotal
function updateSubtotal(inputElement) {
  const row = inputElement.closest("tr");
  const costElement = row.querySelector("td:nth-child(3) span");
  const quantity = parseInt(articles.quantity) //parseInt(inputElement.value);
  const cost = parseFloat(costElement.textContent);
  const subtotal = quantity * cost;
  const subtotalElement = row.querySelector("td:nth-child(5) span");

  subtotalElement.textContent = subtotal;

   // Actualizar el contador
   contador += quantity;

   // Guardar el contador en el localStorage
   localStorage.setItem(articles.quantity, contador);
  
  for (const article of articles) {
    showSubTotalCarrito(article.cost)
  }
  
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


// Carrito de compras inicial
const carrito = [];
let subTotalCostos = 0;
let elCostoDelEnvio = costoDeEnvio.value;
const premium = document.querySelector("#option1");
const express = document.querySelector("#option2");
const standad = document.querySelector("#option3");
const tipoEnvio = document.querySelector("#opciones");

function showSubTotalCarrito(precio) {
  // Agregar el precio al carrito y actualizar el total
  carrito.push(precio);
  subTotalCostos += precio;
  //console.log('Precio agregado al carrito:', precio);
  //console.log('Total del carrito:', total);

  // Actualizar el contenido del elemento HTML precioSubtotal con el nuevo total
  precioSubtotal.innerHTML = "USD " + subTotalCostos;

  // Guardar el carrito en el localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Guardar el total en el localStorage
  localStorage.setItem('subTotalCostos', subTotalCostos);

  showTotalCarrito()
  showCostoDeEnvio()
}

// Recuperar el carrito y el total del localStorage al cargar la página
if (localStorage.getItem('carrito')) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
  subTotalCostos = parseFloat(localStorage.getItem('subTotalCostos'));
}

/*
tipoEnvio.addEventListener("change", () => {
  showCostoDeEnvio()
});
*/

function showCostoDeEnvio() {
  if (premium.checked) {
    elCostoDelEnvio = (subTotalCostos * 0.15);
  } else if (express.checked) {
    elCostoDelEnvio = (subTotalCostos * 0.07);
  } else if (standad.checked) {
    elCostoDelEnvio = (subTotalCostos * 0.05);
  }
  showTotalCarrito()
  costoDeEnvio.innerHTML = "USD " +  elCostoDelEnvio.toFixed();
}

function showTotalCarrito() {
  precioTotal.innerHTML = "USD " + (subTotalCostos + elCostoDelEnvio) ;
  
}


/*
const premium = document.querySelector("#option1");
const express = document.querySelector("#option2");
const standad = document.querySelector("#option3");
const precioSubtotal = document.getElementById("precioSubtotal");
const envio = document.querySelector("#precioCostoDeEnvio");

// Agregar evento change a los elementos de radio (opciones de envío)


// Función para calcular y mostrar el costo de envío
function calcularCostoDeEnvio(porcentaje) {
  const costoEnvio = (total * porcentaje) / 100;
  // Actualizar el elemento HTML que muestra el costo de envío
  envio.textContent = "$" + costoEnvio.toFixed(1); // Formatear a dos decimales
  // Actualizar el total
  actualizarTotal();
}
// Función para actualizar el total (subtotal + costo de envío)
function actualizarTotal() {
  const subtotal = total;
  const costoDeEnvio = parseFloat(envio.textContent.substring(1)); // Obtener el costo de envío como número
  const totalAPagar = subtotal + costoDeEnvio;
  // Actualizar el elemento HTML que muestra el total
  document.getElementById("precioTotal").textContent = "$" + totalAPagar.toFixed(1); // Formatear a dos decimales
}
// Inicializar el cálculo del costo de envío en función del tipo de envío seleccionado
if (premium.checked) {
  calcularCostoDeEnvio(15);
} else if (express.checked) {
  calcularCostoDeEnvio(7);
} else if (standad.checked) {
  calcularCostoDeEnvio(5);
}
*/

