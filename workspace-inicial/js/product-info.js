const productID = localStorage.getItem("productID");
const container = document.getElementById("products-container");
const commentsContainer = document.getElementById("comments-container")
const rating = document.getElementById("rating");
const selectedRating = document.getElementById("selected-rating");
const btnComment = document.getElementById("btnComment");
const relatedProducts = document.getElementById("related-products-container")
const relatedProductsTitle = document.getElementById("related-products-title")



function getProduct(data) {
  return new Promise((resolve, reject) => { //la funcion devuelve una promesa
    fetch(data)
      .then(response => response.json())
      .then(data => resolve(data)) //si obtenemos la data devolvemos una promesa resuelta
      .catch(error => reject(error)) //en caso contrario devolvemos una promesa rechazada
  });
}

//Función que trae los comentarios ya ingresados de cada producto
function getComments(data) {
  return new Promise((resolve, reject) => {
    fetch(data)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  });
}


async function showData() {

  try {
    let product = await getProduct(PRODUCT_INFO_URL + productID + ".json"); //espera a recibir los resultados de la funcion.
    showProducts(product);
  } catch (error) { console.log(error) }

  try {
    let comments = await getComments(PRODUCT_INFO_COMMENTS_URL + productID + ".json");
    showComments(comments);
    hayComentarios()
  } catch (error) { console.log(error) }

  try {
    let related = await getProduct(PRODUCT_INFO_URL + productID + ".json");
    showRelatedProducts(related);
  } catch (error) { console.log(error) }

}

//Función que muestra los detalles de cada producto
function showProducts(data) {
  container.innerHTML += `
  <div class="container">
  <h1 class="p-4 m-0">${data.name}</h1> <button id="btnCarrito">boton</button>
  <hr class="my-2">
  <h3 class="m-0">Precio</h3>
  <p class="pb-2">${data.cost} ${data.currency}</p>
  <h3 class="m-0">Descripción</h3>
  <p class="fs-6">${data.description}</p>
  <h3 class="m-0">Categoría</h3>
  <p class="pb-2">${data.category}</p>
  <h3 class="m-0">Cantidad vendidos</h3>
  <p class="pb-2">${data.soldCount}</p>
  <h3>Imagenes ilustrativas</h3>
  <div class="">
  ${createCarrousel(data.images)}
   </div>
  </div>`

  const btnCarrito = document.getElementById("btnCarrito")
  const productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

  btnCarrito.addEventListener('click', () => {

    const productoExistente = productosSeleccionados.find(product => product.id === data.id)

    // comprueba si ya existe ese producto en el array, si no existe lo agrega.
    if (!productoExistente) {
      productosSeleccionados.push(data);
      localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados))
    }
  });

};

function compararPorFecha(a, b) {
  const fechaA = new Date(a.dateTime);
  const fechaB = new Date(b.dateTime);
  return fechaB - fechaA;
}

//Función que muestra los comentarios ya ingresados de cada producto
function showComments(data_comments) {
  data_comments.sort(compararPorFecha);
  for (const comment of data_comments) {
    commentsContainer.innerHTML += `
      <div class="list-group-item container border border-secondary-subtle rounded my-2 p-1">
       <div class="d-flex flex-wrap justify-content-between ">
          <h6 class="fw-bold ">${comment.user}</h6>
          <span>
          ${stars(comment.score)}
          </span>
        </div>
        <div>
          <p class="mb-1">${comment.description}</p>
          <small class="text-muted">${comment.dateTime}</small>
        </div>
      </div>
      `
  }
};


//Función que muestra los productos relacionados
function showRelatedProducts(data_relatedProducts) {
  relatedProductsTitle.innerHTML += '<h3 class="mt-4">Productos relacionados</h3>';
  if (data_relatedProducts.length === 0) {
    relatedProducts.innerHTML += `<h5 class="text-center text-muted">
      No hay productos relacionados</h5>`;
  } else {
    for (const product of data_relatedProducts.relatedProducts) {
      relatedProducts.innerHTML += `
        <div onclick="setProductID(${product.id})" class="list-group-item d-inline-block mr-2 mb-2 cursor-active"> 
        <div>
            <img src="${product.image}" class="img-fluid mt-2">
        </div>  
        <h4 class="h6 text-center mt-2">${product.name}</h4> 
        </div>`;
    }
  }
};




//Función para otorgar puntaje a través de estrellas
function stars(quantity) {
  return "<i class='fa fa-star checked'></i>".repeat(Math.floor(quantity)) + "<i class='fa fa-star'></i>".repeat(5 - Math.floor(quantity));
};

//Función para crear el carrusel de Imágenes
function createCarrousel(images) {
  return `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel ">
    <div class="carousel-inner">
    ${images.map((image, index) => {
    return `<div class="carousel-item ${index === 0 ? "active" : ""}">
      <img src="${image}" class="w-100 d-block rounded" alt="...">
    </div>`
  })}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
};

// Manejador de clic en las estrellas
rating.addEventListener("click", (event) => {
  if (event.target.classList.contains("star")) {
    const ratingValue = event.target.getAttribute("data-rating");

    // Actualizamos la puntuación seleccionada en el DOM
    selectedRating.textContent = ratingValue;

    // Obtener todas las estrellas
    const stars = document.querySelectorAll(".star");

    // Iterar sobre las estrellas y aplicar el estilo según la puntuación seleccionada
    stars.forEach((star) => {
      const starRating = star.getAttribute("data-rating");
      if (starRating <= ratingValue) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }
});

//agrega comentario con usuario y fecha actual 
btnComment.addEventListener("click", () => {
  const comment = document.getElementById("opinion");
  const ratingValue = selectedRating.textContent;

  var today = new Date();
  var fechaActual = today.toLocaleString();

  if (comment.value != "" && ratingValue != 0) {
    const comentarioGuardado = `
    <div class="list-group-item container border border-secondary-subtle rounded my-2 p-1">
     <div class="d-flex flex-wrap justify-content-between ">
        <h6 class="fw-bold ">${User.email}</h6>
        <span>
        ${stars(ratingValue)}
        </span>
      </div>
      <div>
        <p class="mb-1">${comment.value}</p>
        <small class="text-muted">${fechaActual}</small>
      </div>
    </div>
    `


    saveLocalComment(localStorage.getItem("productID"), comentarioGuardado)
    commentsContainer.insertAdjacentHTML("afterbegin", comentarioGuardado)


    comment.value = "";  //se limpia el textarea
    selectedRating.textContent = 0;   //se vuelve a 0 el contador de estrellas seleccionadas
    const allStars = document.querySelectorAll(".star");
    allStars.forEach((star) => {    //se remueven todas las estrellas seleccionadas
      star.classList.remove("selected");
      hayComentarios()
    });

  } else {
    alert("Debe agregar un comentario y una puntuación")
  }

});

document.addEventListener("DOMContentLoaded", function () {
  showData();
  userMenu();
  showLocalComments(localStorage.getItem("productID"));
  hayComentarios();


});



function hayComentarios() { //verifica si hay comentarios y cambia la propiedad del mensaje para mostrarlo/ocultarlo.
  if (commentsContainer.children.length === 0) {
    document.getElementById("mensajeNoComentarios").style.display = "block";
  } else {
    document.getElementById("mensajeNoComentarios").style.display = "none"
  }
}


//funcion que guarda el comentario junto con el id del producto en localStorage
function saveLocalComment(productID, comentario) {

  //obtiene los comentarios del localStorage si los hay
  const comentariosExistentes = JSON.parse(localStorage.getItem("comentarios")) || {};

  if (!comentariosExistentes[productID]) { //verifica si ya hay un arreglo de comentarios, de lo contrario crea uno vacio
    comentariosExistentes[productID] = []

  }

  comentariosExistentes[productID].push(comentario)

  localStorage.setItem("comentarios", JSON.stringify(comentariosExistentes))

}

//funcion que muestra los comentarios que coincidan con el id del producto.
function showLocalComments(productID) {

  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || {}

  if (comentarios[productID]) {
    comentarios[productID].forEach(comentario => {
      commentsContainer.insertAdjacentHTML("afterbegin", comentario)

    })
  } else {
    console.log("no hay comentarios")
  }

}