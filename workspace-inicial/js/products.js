const categoryID = localStorage.getItem("catID") ?? 101;
const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`

let originalData = []; 

function getData() {
    return fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            originalData = data; // aca aparece dentro del fetch para llevarse datos
            showData(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}

document.addEventListener("DOMContentLoaded", () => { 
    getData(); // El evento que trae todo lo original de la API
});


function showData(dataArray) {
  for (const item of dataArray.products) {
    const contenido = document.getElementById("list-container");

    contenido.innerHTML += `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="${item.image}" alt="product image" class="img-thumbnail"/>
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>${item.name} - ${item.currency} ${item.cost}</h4> 
                    <p>${item.description}</p> 
                    </div>
                    <small class="text-muted"> ${item.soldCount} vendidos</small> 
                </div>

            </div>
        </div>
    </div>
    `; 
  }
}


const searchInput = document.getElementById('buscador'); //toma datos del input
const contenidoProductos = document.querySelector(".pb-5 .container"); // datos de los productos

let productos = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    productos = data.products;
    mostrarHTML(productos);
  })
  .catch(error => console.error("error fetchig data:", error));


searchInput.addEventListener('input', function () {
  const searchText = searchInput.value.toLowerCase();
  const filteredProductos = productos.filter(item =>
    item.name.toLowerCase().includes(searchText) ||
    item.description.toLowerCase().includes(searchText)
  );

  mostrarHTML(filteredProductos);
});

// funcion de mostrar los datos similar a la de showdata()
function mostrarHTML(dataArray) {
  contenidoProductos.innerHTML = '';
  for (const item of dataArray) {
    contenidoProductos.innerHTML += `
      <div class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3"> <img src="${item.image}" alt="product image" class="img-thumbnail"/> </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <div class="mb-1">
                      <h4>${item.name} - ${item.currency} ${item.cost}</h4> 
                      <p>${item.description}</p> 
                      </div>
                      <small class="text-muted"> ${item.soldCount} vendidos</small> 
                  </div>
              </div>
          </div>
      </div>
      `; 
  }
}
