const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function mostrarHTML(dataArray) {

  for (const item of dataArray.products) {
    const contenido = document.querySelector(".pb-5 .container");

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


fetch(url) 
.then(response => response.json()) 
.then(data => mostrarHTML(data)) 
.catch(error => console.error("error fetchig data:", error));

