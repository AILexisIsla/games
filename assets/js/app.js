let listaJuegos = JSON.parse(localStorage.getItem('arrayProductosKey')) || [];

listaJuegos.map((item)=> crearColumna(item))

function crearColumna(juego){
  if (juego.destacado){
    let portada = document.getElementById('portadaAdmin');
    portada.styleName = `background-image: url('${juego.url}')`;
    portada.innerHTML += `<div class="container">
    <div class="hero-content">
      <p class="hero-subtitle">${juego.categoria}</p>

      <h1 class="h1 hero-title">
        ${juego.nombre}
      </h1>

      <p class="hero-text">
        ${juego.descripcion}
      </p>
      <p class="hero-text">ARS$${juego.precio}</p>
    </div>
    <figure
      class="hero-banner img-holder"
      style="--width: 900; --height: 700"
    >
      <img
        src="${juego.url}"
        width="700"
        height="700"
        alt="hero banner"
        class="w-100"
      />
    </figure>
  </div>`
}}