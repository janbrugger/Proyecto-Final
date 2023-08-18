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


});

 

const User = JSON.parse(localStorage.getItem("user")) || []//user es la key con la que identifico la session.


//VerificaciÃ³n del login:
if (User.email == undefined || User.email === "" || User.password == undefined || User.password.length < 6){ //si se cumple redirecciona al login.
    alert("Inicia sesion para continuar");
    window.location.href = "login.html";
};
