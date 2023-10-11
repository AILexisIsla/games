function productCardClick(event) {
    // Get the image and description of the product card that was clicked.
    const image = event.target.querySelector('.shop-card-image').src;
    const description = event.target.querySelector('.shop-card-content').textContent;
  
    // Change the browser's URL to the product detail page.
    window.location.href = '/vermasVariacion';
  
    // Pass the image and description of the product card as parameters to the product detail page.
    window.history.pushState({ image, description }, 'Product Detail', '/vermasVariacion.html');
  }