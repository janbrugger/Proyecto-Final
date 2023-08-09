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
const signBtn = document.getElementById("sBtn");


// Agregar evento de click al botón de registro
signBtn.addEventListener("click", function () {
    // Obtener los valores ingresados por el usuario


    const email = document.getElementById("floatingInput").value;            // Obtener el valor del campo "Email"
    const password = document.getElementById("floatingPassword").value;    // Obtener el valor del campo "Contraseña"
    //const recuerdame = document.getElementById("chkbox").checked;    // Verificar si el checkbox de "remember me" está marcado


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
    }
});

// window.location.href = "../index.html"