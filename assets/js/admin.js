import {
    campoRequerido,
    validarNumeros,
    validarURL,
    validarGeneral,
  } from './validaciones.js';
  console.log('hola mundo');
  import { Producto } from './productclass.js';
  
  //traer los elementos que necesito del html
  // let campoCodigo = document.getElementById('codigo');
  //console.log(campoCodigo);

  let campoCodigo = generarCodigo(6);
  let campoURL = document.getElementById('URL');
  let campoNombre = document.getElementById('nombre');
  let campoCategoria = document.getElementById('categoria');
  let campoPrecio = document.getElementById('precio');
  let campoDescripcion = document.getElementById('descripcion');
  let campoPublicado = document.getElementById('publicado');
  let campoDestacado = document.getElementById('destacado');
  
  let formProducto = document.getElementById('formProducto');
  let nuevoJuego = document.getElementById('nuevoJuego');
  let btnDatosPrueba = document.getElementById('btnDatosPrueba');
  
  let productoExistente = false; //variable bandera: si el productoExistente es false quiero crearlo,
  //si  productoExistente es true quiero modificar el producto existente
  
  //Si hay productos el localStorage quiero guardarlos en listaProductos si no q sea un array vacio
  let listaProductos =
    JSON.parse(localStorage.getItem('arrayProductosKey')) || [];
  
  //asociar un evento a cada elemento obtenido

console.log(campoURL);

  function generarCodigo(length) {
    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(index);
    }
    return codigo;
  }
  
  
  campoURL.addEventListener('blur', () => {
    console.log('desde url');
    validarURL(campoURL);
  });

  campoNombre.addEventListener('blur', () => {
    console.log('desde codigo');
    campoRequerido(campoNombre);
  });
  
  campoCategoria.addEventListener('blur', () => {
    console.log('desde producto');
    campoRequerido(campoCategoria);
  });
  
  campoPrecio.addEventListener('blur', () => {
    console.log('desde cantidad');
    validarNumeros(campoPrecio);
  });
  
  campoDescripcion.addEventListener('blur', () => {
    console.log('desde descripcion');
    campoRequerido(campoDescripcion);
  });
  
  
  formProducto.addEventListener('submit', guardarProducto);
  nuevoJuego.addEventListener('click', limpiarFormulario);
  btnDatosPrueba.addEventListener('click', cargarDatosPrueba)
  
  //llamo a carga inicial: so tengo productos en localStorage que lo muestre en la tabla de productos
  cargaInicial();
  
  //aquí empieza la lógica del CRUD
  
  function guardarProducto(e) {
    //para prevevier la actualización de la página
    e.preventDefault();
    //verificar que todos los datos sean correctos
  
    if (
      validarGeneral(
        campoURL,
        campoCodigo,
        campoNombre,
        campoCategoria,
        campoPrecio,
        campoDescripcion,
      )
    ) {
      console.log('los datos correctos listos para enviar');
      if (!productoExistente) {
        //crear producto
        crearProducto();
      } else {
        //modificar producto
        modificarProducto();
      }
    }
  }
  
  function crearProducto() {
    //invocar una función codigoUnico() ---> retornar un código único
    // const codUnico = codigoUnico()
    //hacer que el campoCodigo este disable
    //crear un objeto producto
    let productoNuevo = new Producto(
      campoURL.value,
      campoCodigo.value,
      campoNombre.value,
      campoCategoria.value,
      campoPrecio.value,
      campoDescripcion.value,
      campoPublicado.value,
      campoDestacado.value
    );
  
    console.log(productoNuevo);
    listaProductos.push(productoNuevo);
    console.log(listaProductos);
    //limpiar el formulario
    limpiarFormulario();
    //guardar el array de productos dentro dee localStorage
    guadarLocalStorage();
    //mostrar el cartel al usuario
    Swal.fire(
      'Producto creado!',
      'El producto fue creado correctamente!',
      'success'
    );
    //cargar el producto en la tabla
    crearFila(productoNuevo);
  }
  
  function limpiarFormulario() {
    //limpiamos los values del formulario
    formProducto.reset();
    //resetear las clases de los input
    campoURL.className = 'form-control';
    campoNombre.className = 'form-control';
    campoCategoria.className = 'form-control';
    campoPrecio.className = 'form-control';
    campoDescripcion.className = 'form-control';
    campoPublicado.className = 'form-check-input';
    campoDestacado.className = 'form-check-input';
    //resetear la varibale bandera o booleana para el caso de modificarProducto
    productoExistente = false;
  }
  
  function guadarLocalStorage() {
    localStorage.setItem('arrayProductosKey', JSON.stringify(listaProductos));
  }
  
  function crearFila(producto) {
    let tablaProducto = document.getElementById('catalogo');
    //usamos el operador de asignación por adición para concatenar con lo que ya tengo de contenido
    
    tablaProducto.innerHTML += `<li class="col-sm-12 col-md-4 col-lg-3">
    <div class="shop-card">
      <figure
        class="card-banner img-holder efectofoto"
        style="--width: 300; --height: 260"
      >
        <img
          src="${producto.url}"
          width="300"
          height="260"
          loading="lazy"
          alt="Virtual Reality Smiled"
          class="img-cover"
        />
      </figure>

      <div class="card-content">
        <a href="#" class="card-badge skewBg">${producto.categoria}</a>

        <h3 class="h3">
          <a href="#" class="card-title">${producto.nombre}</a>
        </h3>
        
        <div class="card-body text-white">
          <p>Codigo: ${producto.codigo}</p>
          <p>Descripcion: ${producto.descripcion}</p>
        </div>

        <div class="card-wrapper">
          <p class="card-price">ARS$ ${producto.precio}</p>
        </div>
        <div class="d-flex justify-content-between">
        <button class="card-btn" data-bs-toggle="modal"
        data-bs-target="#NuevoJuego"onclick="prepararEdicionProducto(${producto.codigo})">
          <img src="./assets/images/Edit_Admin.png" alt="edit">
        </button>
        <button class="card-btn"onclick="eliminarJuego(${producto.codigo})">
          <img src="./assets/images/Delet_Admin.png" alt="delet">
        </button>
        <button class="card-btn " onclick="destacarJuego(${producto.codigo})">
          <img src="./assets/images/Black_Star_Admin.png" alt="highlight">
        </button>
        </div>
      </div>
    </div>
  </li>`;

//   if (publicar){
//     let blackStar = document.querySelector('.efectofoto')
//   }else{
//     editarCheckbox (producto.destacado);
//   }
  

//  function editarCheckbox (destacar){
//     let star = document.getElementById('')
//   }
 }

  function cargaInicial() {
    if (listaProductos.length > 0) {
      //crear filas
      listaProductos.map((itemProducto) => crearFila(itemProducto));
      //listaProductos.forEach((itemProducto) => crearFila(itemProducto));
    }
  }
  
  /* 
  al intentar acceder a una función que se invoca desde el html no la encuetra
  para solucionarlo agrego la función como un método del objeto globa window
  function prepararEdicionProducto(){
     console.log('desde editar');
  }
   */
  
  window.prepararEdicionProducto = function (codigo) {
    //console.log('desde editar');
    //console.log(codigo);
    //buscar el prodcuto en el array de productos
    let productoBuscado = listaProductos.find(
      (itemProducto) => itemProducto.codigo === codigo
    );
    console.log(productoBuscado);
  
    //mostrar el producto en el formulario. No se debe de poder editar le código
    campoURL.value = productoBuscado.url;
    campoNombre.value = productoBuscado.nombre;
    campoCategoria.value = productoBuscado.categoria;
    campoPrecio.value = productoBuscado.precio;
    campoDescripcion.value = productoBuscado.descripcion;
    campoPublicado.value = productoBuscado.publicado;
    campoDestacado.value = productoBuscado.destacado;
  
    //modifico la variable bandera productoExistente
    productoExistente = true;
  };
  
  function modificarProducto() {
    Swal.fire({
      title: 'Seguro que desea modificar este producto?',
      text: 'Podrá volver a editar este producto si lo desea',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log('desde modificar');
        //encontrar la posición del elemento que quiero modificar dentro de mi array de productos
        let indiceProducto = listaProductos.findIndex(
          (itemProducto) => itemProducto.codigo === campoCodigo.value
        );
        console.log(indiceProducto);
  
        //modificar los valores del elemento couyo indice encontramos
        listaProductos[indiceProducto].producto = campoProducto.value;
        listaProductos[indiceProducto].descripcion = campoDescripcion.value;
        listaProductos[indiceProducto].cantidad = campoCantidad.value;
        listaProductos[indiceProducto].url = campoURL.value;
  
        //actualizar el localStorage
        guadarLocalStorage();
  
        //actualizar la tabla
        borrarTabla();
        cargaInicial();
  
        //mostrar cartel al usuario
        Swal.fire(
          'Producto modificado!',
          'El producto fue modificado correctamente!',
          'success'
        );
  
        //limpiar formulario y reseta la variable bandera
        limpiarFormulario();
      }
    });
  }
  
  function borrarTabla() {
    let tablaProducto = document.querySelector('#tablaProducto');
    tablaProducto.innerHTML = '';
  }
  
  window.borrarProducto = function (codigo) {
    Swal.fire({
      title: 'Seguro que desea eliminar este producto?',
      text: 'La acción no prodrá revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //opción 1: encontar la posición o el indice del elemento del array y borrarlo
        //1ero: encontrar el indice con findIndex y usar splice(indiceEncontrado, 1)
  
        //opción 2: usando filter
  
        let nuevaListaProductos = listaProductos.filter(
          (itemProducto) => itemProducto.codigo !== codigo
        );
        console.log(nuevaListaProductos);
        //actualizar el array original y guardar en localStorage
        listaProductos = nuevaListaProductos;
        guadarLocalStorage();
  
        //actualizar la tabla
        borrarTabla();
        cargaInicial();
  
        //mostrar cartel al usuario
        Swal.fire(
          'Producto eliminado!',
          'El producto fue eliminado correctamente!',
          'success'
        );
      }
    });
  };
  
  
  function cargarDatosPrueba(){
    const datos = [
      {
        codigo: "994",
        producto: "Kakashi Hatake (Anbu)",
        cantidad: "1",
        descripcion:
          "Funko Figura Pop Naruto Shippuden Kakashi Hatake (Anbu) (AAA Anime Exclusive)",
        url: "https://m.media-amazon.com/images/I/51Mkr80aQqL._AC_SL1092_.jpg",
      },
      {
        codigo: "933",
        producto: "Shikamaru Nara",
        cantidad: "1",
        descripcion: "Naruto shippuden",
        url: "https://m.media-amazon.com/images/I/51BitznofnL._AC_SL1300_.jpg",
      },
      {
        codigo: "184",
        producto: "Tobi",
        cantidad: "1",
        descripcion:
          "Figura de Tobi de Naruto Shippuden de la marca FunKo POP Anime",
        url: "https://m.media-amazon.com/images/I/51-H7QOsVES._AC_SL1200_.jpg",
      },
      {
        codigo: "729",
        producto: "Orochimaru",
        cantidad: "1",
        descripcion: "Orochimaru Figura Coleccionable, Multicolor (46628)",
        url: "https://m.media-amazon.com/images/I/610cunP4zOL._AC_SL1200_.jpg",
      },
      {
        codigo: "073",
        producto: "Jiraiya On Toad",
        cantidad: "1",
        descripcion:
          "Jiraiya On Toad Anime Figura De Acción Juguetes 73 Colección Modelo De Personaje Estatua 10 Cm En Caja",
        url: "https://m.media-amazon.com/images/I/61sLJuTZxBS._AC_SL1500_.jpg",
      },
      {
        codigo: "728",
        producto: "Gaara ",
        cantidad: "1",
        descripcion: "Gaara Figura Coleccionable, Multicolor (46627)",
        url: "https://m.media-amazon.com/images/I/616YRHWRZwL._AC_SL1200_.jpg",
      },
      {
        codigo: "182",
        producto: "Kakashi Figure",
        cantidad: "1",
        descripcion:
          'Funko FM-B01M5KD9Y6 Naruto Shippuden 12450"POP Vinyl Kakashi Figure',
        url: "https://m.media-amazon.com/images/I/617XvrkXkEL._AC_SL1360_.jpg",
      },
    ];
  
   if (!localStorage.getItem("arrayProductosKey")) {
     // quiero agregar los datos de productos
     console.log('cargar datos prueba');
     localStorage.setItem("arrayProductosKey", JSON.stringify(datos));
     listaProductos = datos;
     //mostar en la tabla
     listaProductos.forEach(itemProducto => {
       crearFila(itemProducto);
     })
   }
  };