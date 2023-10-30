document.addEventListener("DOMContentLoaded", function () {
    userMenu();
    themeMenu();
    autocompleteProfileInfo()
});

document.getElementById("form").addEventListener("submit", (e)=> {
    e.preventDefault()
    setProfileInfo()
});


function setProfileInfo(){
   const nombre = document.getElementById("nombre").value
   const nombre2 = document.getElementById("nombre2").value
   const apellido = document.getElementById("apellido").value
   const apellido2 = document.getElementById("apellido2").value
   const email = document.getElementById("email").value //se tiene que poder cambiar el mail navbar y localstorage
   const contacto = document.getElementById("contacto").value


   User.name = nombre;
   User.name2 = nombre2;
   User.lastName = apellido;
   User.lastName2 = apellido2;
   User.email = email
   User.contact = contacto;
   localStorage.setItem("user", JSON.stringify(User)); //guardamos en el storage
};

//rellena los campos con la informacion del perfil al cargar la pagina.
function autocompleteProfileInfo(){
const email = document.getElementById("email").value = User.email
}