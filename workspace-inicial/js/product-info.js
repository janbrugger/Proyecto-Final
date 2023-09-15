const productID = localStorage.getItem("productID");
const url_products = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const url_comments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
const container = document.getElementById("products-container");
const comments = document.getElementById("comments")


document.addEventListener("DOMContentLoaded", function() {
    getData()
    getComments()
})

function getData(){
    return fetch(url_products)
    .then(response => response.json())
        .then(data => { 
          showProducts(data);
        })
        .catch(error => console.error("error fetchig data:", error));
}

function getComments(){
    return fetch(url_comments)
    .then(response => response.json())
        .then(data_comments => { 
          showComments(data_comments);
        })
        .catch(error => console.error("error fetchig data:", error));
}

function showProducts(data) { //funcion que muestra informacion y detalles del producto
    container.innerHTML += `<div class="container">
    <h1 class="p-5">${data.name}</h1>
    <hr>
    <h3>Precio</h3>
    <p class="pb-4">${data.cost} ${data.currency}</p>
    <h3>Descripción</h3>
    <p class="pb-4">${data.description}</p>
    <h3>Categoría</h3>
    <p class="pb-4">${data.category}</p>
    <h3>Cantidad vendidos</h3>
    <p class="pb-4">${data.soldCount}</p>
    <h3>Imagenes ilustrativas</h3>
    <div class="d-flex flex-row">
    
    ${data.images.map(imageUrl => `<div class=""> <img class="w-100 p-4 d-block border" src="${imageUrl}"></div>`).join('')}
     </div>
    </div>`
}


function showComments(data_comments){ //funcion que muestra los comentarios del producto
    container.innerHTML += '<h3>Comentarios</h3>';
    if (data_comments.length === 0) {
        comments.innerHTML = `<div class=text-center><h4 class="text-muted" class=small >
        No se han agregado comentarios sobre este producto</h4></div>`;
    } else {
    for (const comment of data_comments) {
        container.innerHTML += `
        <div class="list-group-item">
            <h4>${comment.user}</h4>
            <span>
            ${stars(comment.score)}
            </span>
            <p>${comment.description}</p>
            <small class="text-muted">
            ${comment.dateTime}</small>
        </div>
        `
    }
}

function stars(quantity) {
    return "<i class='fa fa-star checked'></i>".repeat(Math.floor(quantity)) + "<i class='fa fa-star'></i>".repeat(5 - Math.floor(quantity));
}}
