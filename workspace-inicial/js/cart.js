const userID = 25801;
const container = document.getElementById("items");
const articles = JSON.parse(localStorage.getItem("productosSeleccionados"))

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

