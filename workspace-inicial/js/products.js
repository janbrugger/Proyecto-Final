const categoryID = localStorage.getItem("catID") ?? 101;
const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`

// Buscador
const searchInput = document.getElementById('buscador'); //toma datos del input
const contenidoProductos = document.getElementById("list-container"); // datos de los productos

const btnFiltrar = document.getElementById("rangeFilterCount");
const btnLimpiar = document.getElementById("clearRangeFilter");

const minInput = document.getElementById("rangeFilterCountMin");
const maxInput = document.getElementById("rangeFilterCountMax");

let originalData = []; 

//función fetch de los datos de la api
function getData() { 
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            originalData = data.products; //aqui se almacenan los datos en el array originalData
          showData(originalData);
        })
        .catch(error => console.error("error fetchig data:", error));
}

// funcion que muestra los datos en el html
function showData(dataArray) {
  contenidoProductos.innerHTML = ''; //primero vacía el contenido 
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
};

//Funciones de Filtro por precio y limpieza
function filtrarPrecio(elements) {
  const contFiltrado = [];
  for (const element of elements) { 
      const price = parseFloat(element.cost); // Obtener el precio como número
      if (!isNaN(price) && price >= parseFloat(minInput.value) && price <= parseFloat(maxInput.value)) {
          contFiltrado.push(element);
      }
  }
  showData(contFiltrado);
};

function limpiar() {
  getData(); // Vuelve a obtener los datos originales del listado
  minInput.value = "";
  maxInput.value = "";
};

//evento al cargar el sitio
document.addEventListener("DOMContentLoaded", () => { 
  getData(); // 
  });
  //evento de escribir en el buscador
  searchInput.addEventListener('input', function () { 
  const searchText = searchInput.value.toLowerCase();
  const filteredProductos = originalData.filter(item =>
    item.name.toLowerCase().includes(searchText) ||
    item.description.toLowerCase().includes(searchText)
  );
  showData(filteredProductos);
  });
  //evento al hacer click en filtrar
  btnFiltrar.addEventListener("click", () => {
    filtrarPrecio(originalData);
  });
  //evento al hacer click en limpiar
  btnLimpiar.addEventListener("click", () => {
    limpiar();
  });

