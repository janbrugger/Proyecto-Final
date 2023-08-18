function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
    setTimeout(() => {
        document.getElementById("alert-success").classList.remove("show")
    }, 3000);

}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    setTimeout(() => {
        document.getElementById("alert-danger").classList.remove("show")
    }, 3000);


}


// Obtener referencia al botón de registro
const logForm = document.querySelector("#logForm");


// Agregar evento de click al botón de registro
logForm.addEventListener("submit",  (e) => {
    e.preventDefault() //evita que la pagina se recargue

    const email = document.querySelector("#floatingInput").value;            // Obtener el valor del campo "Email"
    const password = document.querySelector("#floatingPassword").value;    // Obtener el valor del campo "Contraseña"
    //const recuerdame = document.getElementById("chkbox").checked;    // Verificar si el checkbox de "remember me" está marcado

    function validUser(){
        // Realizar validaciones
    if (
        email.trim() === "" ||            // Verificar si el campo "Email" está vacío
        password.length < 6               // Verificar si la contraseña tiene menos de 6 caracteres
    ) {
        // Mostrar alerta de error
        showAlertError();

    } else {
        // Mostrar alerta de éxito
        showAlertSuccess();
        window.location.href = "index.html";
    }
    }
    
    localStorage.setItem('login_success', JSON.stringify(validUser()))
});