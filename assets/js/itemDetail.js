// toma el id 
const linkElement = document.getElementById('grounded-img');

// agrega un click event listener al id
linkElement.addEventListener('click', function(event) {
  event.preventDefault(); // previene de un comportamiento por defecto al seguir el link

  // agrega la accion necesaria a la pagina de destino
  changeImagesInVerMasVariacionPage();
});

function changeImagesInVerMasVariacionPage() {
    // abre la pagna de destino en otra ventana
    const newWindow = window.open('/pages/vermasVariacion.html');
  
    // espera a que cargue la pagina
    newWindow.addEventListener('load', function() {
      // obtiene la imagen por su nombre de clase u otro selector de la nueva ventana
      const imageElements = newWindow.document.getElementById('imagencentral');
  
      // Update the src attribute to change the image
    imageElement.src = 'assets/images/shop-img-1.jpg';
});
}
