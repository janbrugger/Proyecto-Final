const userID = 25801;
const container = document.getElementById("items");
const articles = JSON.parse(localStorage.getItem("productosSeleccionados"))
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

// Agregar evento input a los elementos de cantidad
container.addEventListener("input", function (event) {
  if (event.target.classList.contains("quantity-input")) {
    updateSubtotal(event.target);
  }
});

//Mostrar info del carrito traida del Localstorage
document.addEventListener("DOMContentLoaded", function () {
  showCartData();
  for (const article of articles) {
    container.innerHTML += `
    <tr>
      <td><img onclick="setProductID(${article.id})" src="${article.images[1]}" class="img-fluid mt-2 cursor-active" style="max-height: 80px;"></img></td>
      <td>${article.name}</td>
      <td>${article.currency} <span>${article.cost}</span></td>
      <td><input class="col-lg-2 quantity-input" type="number" min="1" value="1"></td>
      <td><strong>${article.currency} <span>${article.cost}</span></strong></td>
    </tr>
    `
  };

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

document.addEventListener("DOMContentLoaded", function (){
showData();

});

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
