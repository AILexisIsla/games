let listaProductos = JSON.parse(localStorage.getItem('arrayProductosKey')) || [];

listaProductos.map((item)=> crearColumna(item))

function crearColumna(producto){
    let grilla = document.getElementById('catalogo');

    grilla.innerHTML += `<div class='col-sm-12 col-md-4 col-lg-3 mb-3 mx-2'>
    <div class="card h-100">
      <img src="${producto.url}" class="card-img-top" alt="${producto.producto}">
      <div class="card-body">
        <h5 class="card-title">${producto.producto}</h5>
        <p class="card-text">S${producto.descripcion}</p>
      </div>
    </div>
  </div>`
}

function destacado (codigo){
  console.log('desde destacado');
  let estrella =  document.getElementBy('est')
  let portada = document.getElementById('portada');
  /*
    if(array.elemento){
    array.elementoDestacado = false
    array.elementoNuevodestacado = true
    portada.innetHTML = DATOS DEL JUEGO
  }  
  */
}

function verMasCatalogo() {
  console.log('desde ver mas');
  /*
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML += .....
  */
}

function cargarDatosPrueba() {
  console.log('desde carga');
  /*
    let catalogo = document.getElementById('catalogo');
    for ( let i= 0; listaProductos.length < 3 ; i++ ) {
    Catalogo.innerHTML += ....
  }

  */
}