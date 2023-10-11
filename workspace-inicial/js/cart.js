const userID = 25801;
const container = document.getElementById("items");
let data_cart; // Variable global para almacenar los datos del carrito

// Fetch Carrito
function getCartInfo(data) {
  return new Promise((resolve, reject) => {
    fetch(data)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  });
}

// Mostrar información del carrito
async function showData() {
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

// Mostrar información del carrito
function showCartInfo(data_cart) {
  for (const [index, article] of data_cart.articles.entries()) {
    container.innerHTML += `
      <tr data-index="${index}">
        <td><img onclick="setProductID(${article.id})" src="${article.image}" class="img-fluid mt-2 cursor-active" style="max-height: 80px;"></td>
        <td>${article.name}</td>
        <td>${article.currency} <span>${article.unitCost}</span></td>
        <td><input class="col-lg-2 quantity-input" type="number" min="1" value="${article.count}"></td>
        <td><strong>${article.currency} <span>${article.unitCost * article.count}</span></strong></td>
      </tr>
    `;
  }
}

// Actualizar subtotal en tiempo real
function updateSubtotal(inputElement) {
  const rowIndex = inputElement.closest("tr").getAttribute("data-index");
  const quantity = parseInt(inputElement.value);
  const article = data_cart.articles[rowIndex];
  const subtotal = quantity * article.unitCost;

  const subtotalElement = inputElement.closest("tr").querySelector("td:last-child strong span");
  subtotalElement.textContent = subtotal;
}

document.addEventListener("DOMContentLoaded", function () {
  showData();
});
