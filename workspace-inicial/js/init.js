const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const User = JSON.parse(localStorage.getItem("user")) || []//user es la key con la que identifico la session.
const navbar = document.getElementById("navbar");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

let showUserNavbar = function () { //funcion para mostrar usuario en navbar.
  if (User.email === undefined) {
    navbar.innerHTML += `<li class="nav-item">
    <a class="nav-link active">Login</a>
    </li>`
  } else
    navbar.innerHTML += `<li class="nav-item">
  <a class="nav-link active">${User.email}</a>
  </li>`
};

let verificacionLogin = function () { //Verificacion del login:
  if (User.email == undefined || User.email === "" || User.password == undefined || User.password.length < 6) { //si se cumple redirecciona al login.
    alert("Inicia sesion para continuar");
    window.location.href = "login.html";
  };
};