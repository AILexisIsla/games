let listaProductos = JSON.parse(localStorage.getItem('arrayProductosKey')) || [];

listaProductos.map((item)=> crearColumna(item))

function crearColumna(producto){
  if (producto.destacado){
    let portada = document.getElementById('portadaAdmin');
    portada.styleName = `background-image: url('${producto.url}')`;
    portada.innerHTML += `<div class="container">
    <div class="hero-content">
      <p class="hero-subtitle">${producto.categoria}</p>

      <h1 class="h1 hero-title">
        ${producto.nombre}
      </h1>

      <p class="hero-text">
        ${producto.descripcion}
      </p>
      <p class="hero-text">ARS$${producto.precio}</p>
    </div>
    <figure
      class="hero-banner img-holder"
      style="--width: 900; --height: 700"
    >
      <img
        src="${producto.url}"
        width="700"
        height="700"
        alt="hero banner"
        class="w-100"
      />
    </figure>
  </div>`
}}