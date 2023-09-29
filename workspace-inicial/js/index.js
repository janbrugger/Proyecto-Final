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

    //DARK MODE
    const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.querySelector("body").setAttribute("data-bs-theme", currentTheme);
    document.getElementById("switch").checked = currentTheme === "dark";
  }
    

    userMenu();
    showUserNavbar();
});


//dark mode
const cambiarTema = () => {
  const body = document.querySelector("body");
  const isLightMode = body.getAttribute("data-bs-theme") === "light";
  const newTheme = isLightMode ? "dark" : "light";

  body.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

/*
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
  */
