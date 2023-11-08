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

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()

    if (nombre.value != "" && apellido.value != "" && email.value != "" && contacto.value != "") {
        setProfileInfo()
    }
});


//guarda los datos ingresados en el localStorage
function setProfileInfo() {

    User.name = nombre.value;
    User.name2 = nombre2.value;
    User.lastName = apellido.value;
    User.lastName2 = apellido2.value;
    User.email = email.value
    User.contact = contacto.value;
    localStorage.setItem("user", JSON.stringify(User));
};

//rellena los campos con la informacion del perfil al cargar la pagina.
function autocompleteProfileInfo() {

    if (User.name) { nombre.value = User.name; };
    if (User.name2) { nombre2.value = User.name2; };
    if (User.lastName) { apellido.value = User.lastName; };
    if (User.lastName2) { apellido2.value = User.lastName2; };
    if (User.email) { email.value = User.email; };
    if (User.contact) { contacto.value = User.contact; };
}

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()