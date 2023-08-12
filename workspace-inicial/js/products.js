const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function mostrarHTML(dataArray) {

  for (const item of dataArray.products) {
    const contenido = document.querySelector(".pb-5 .container");

    contenido.innerHTML += `
    <p>Nombre: ${item.name}<p/>
    <p>Costo: ${item.cost}<p/>
    <p>Descripción: ${item.description}<p/>
    <p>Cantidad vendidos: ${item.soldCount}<p/>
    <p>Imagen: ${item.image}<p/>
    `; 
  }
}


fetch(url) 
.then(response => response.json()) 
.then(data => mostrarHTML(data)) 
.catch(error => console.error("error fetchig data:", error));