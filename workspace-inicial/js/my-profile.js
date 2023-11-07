const fileInput = document.getElementById("fileInput");
const uploadedImage = document.getElementById("uploadedImage");
const uploadButton = document.getElementById("uploadButton");
const imagenAdicional = document.getElementById("imagenAdicional");
const imageNavbar = document.getElementById("imageNavbar");



uploadButton.addEventListener("click", function () {
    const file = fileInput.files[0];
    if (file) {
        if (file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            uploadedImage.src = imageUrl;

            const imageNavbar = document.getElementById("imageNavbar");
            imageNavbar.src = imageUrl;

            // Guarda la imagen en el Local Storage
            localStorage.setItem("savedImage", imageUrl);

        
        } else {
            console.log("El archivo seleccionado no es una imagen.");
        }
    } else {
        console.log("Ningún archivo seleccionado.");
    }
});

// Carga la imagen guardada si existe
const savedImage = localStorage.getItem("savedImage");
if (savedImage) {
    uploadedImage.src = savedImage;

    
}


document.addEventListener("DOMContentLoaded", function () {
    userMenu();
    themeMenu();
});