const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"
const autos = document.querySelector(".pb5-container");
autos.addEventListener("click", obtenerDatos);

function obtenerDatos() {
    fetch(url)
    .then (respuesta => respuesta.json
    )
    .then (resultado => mostrarHTML(resultado))
}

function mostrarHTML({ name, cost, description, soldCount, image }) {
const contenido = document.querySelector(".container")

contenido.innerHTML = `
<p>Nombre: ${name}<p/>
<p>Costo: ${cost}<p/>
<p>Descripción: ${description}<p/>
<p>Cantidad vendidos: ${soldCount}<p/>
<p>Imagen: ${image}<p/>
`
}