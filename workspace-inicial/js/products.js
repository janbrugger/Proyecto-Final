const categoryID = localStorage.getItem("catID") ?? 101;
const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryID}.json`

let originalData = []; 

//evento al cargar el sitio
document.addEventListener("DOMContentLoaded", () => { 
    getData(); // 
});

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

// Buscador
const searchInput = document.getElementById('buscador'); //toma datos del input
const contenidoProductos = document.getElementById("list-container"); // datos de los productos

//evento de escribir en el buscador
searchInput.addEventListener('input', function () { 
  const searchText = searchInput.value.toLowerCase();
  const filteredProductos = originalData.filter(item =>
    item.name.toLowerCase().includes(searchText) ||
    item.description.toLowerCase().includes(searchText)
  );
  showData(filteredProductos);
});

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
}


