const userID = 25801;
const container = document.getElementById("items");

//Fecth Carrito
function getCartInfo(data) {
    return new Promise((resolve, reject) => {
      fetch(data)
        .then(response => response.json())
        .then(data => resolve(data)) 
        .catch(error => reject(error)) 
    });
  }
  async function showData() {
    try {
      let cart = await getCartInfo(CART_INFO_URL + userID + ".json"); 
      showCartInfo(cart);
    } catch (error) { console.log(error) }
}

//Mostrar info del carrito
function showCartInfo(data_cart){
    for (const article of data_cart.articles) {
        container.innerHTML += `
              <tr>
                <td><img onclick="setProductID(${article.id})" src="${article.image}" class="img-fluid mt-2 cursor-active" style="max-height: 80px;"></img></td>
                <td>${article.name}</td>
                <td>${article.currency} <span>${article.unitCost}</span></td>
                <td><input class="col-lg-2"  value=${article.count}></td>
                <td><strong>${article.currency} <span>${article.unitCost*article.count}</span><strong></td>
              </tr>
              `
    }
}



document.addEventListener("DOMContentLoaded", function (){
showData();

});