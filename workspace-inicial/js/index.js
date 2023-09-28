document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    userMenu();
    showUserNavbar();
});



  const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
  }

  const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
  }

  const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light"?
    temaOscuro() : temaClaro();
  }
