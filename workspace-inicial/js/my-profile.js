const nombre = document.getElementById("nombre");
const nombre2 = document.getElementById("nombre2");
const apellido = document.getElementById("apellido");
const apellido2 = document.getElementById("apellido2");
const email = document.getElementById("email");
const contacto = document.getElementById("contacto");


document.addEventListener("DOMContentLoaded", function () {
    userMenu();
    themeMenu();
    autocompleteProfileInfo()
});

document.getElementById("form").addEventListener("submit", (e)=> {
    e.preventDefault()
    setProfileInfo()
});


//guarda los datos ingresados en el localStorage
function setProfileInfo(){

   User.name = nombre.value;
   User.name2 = nombre2.value;
   User.lastName = apellido.value;
   User.lastName2 = apellido2.value;
   User.email = email.value
   User.contact = contacto.value;
   localStorage.setItem("user", JSON.stringify(User));
};

//rellena los campos con la informacion del perfil al cargar la pagina.
function autocompleteProfileInfo(){

nombre.value = User.name;
nombre2.value = User.name2;
apellido.value = User.lastName;
apellido2.value = User.lastName2;
email.value = User.email;
contacto.value = User.contact;
}