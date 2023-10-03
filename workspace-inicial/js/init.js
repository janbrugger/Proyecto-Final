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
  if (!verificacionLogin()) {
    navbar.innerHTML += `<li class="nav-item">
    <a class="nav-link active">${User.email}</a>
    </li>`
  }
};

let verificacionLogin = function () { //Verificacion del login:
  if (User.email == undefined || User.email === "" || User.password == undefined || User.password.length < 6) { //si se cumple redirecciona al login.
    alert("Inicia sesion para continuar");
    window.location.href = "login.html";
    return true;
  };
};

//funcion para eliminar "user" del localStorage
let logout = function () {
  try {
    const itemLogout = document.getElementById("itemLogout"); //itemLogout es el id del dropdown-item "Cerrar sesion"

    itemLogout.addEventListener("click", function () {
      localStorage.removeItem("user")
    })
  } catch (error) {
    console.log(error); //error que se genera al intentar obtener el elemento "logout"
  }
}


//DARK MODE
const currentTheme = localStorage.getItem("theme");

function themeCheck(){ 
  if (currentTheme) {
    document.querySelector("body").setAttribute("data-bs-theme", currentTheme);
    if(localStorage.getItem("theme") === "dark"){  //switch que se queda activo si esta en modo oscuro.
      document.getElementById("switch").setAttribute("checked", "checked");
  
    }
  }
}


//dark mode
const cambiarTema = () => {
  const body = document.querySelector("body");
  const isLightMode = body.getAttribute("data-bs-theme") === "light";
  const newTheme = isLightMode ? "dark" : "light";

  body.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};


//Función para guardar id del producto y redirigir a la página
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}