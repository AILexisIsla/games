import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";

import { Producto } from "./productclass.js";
let campoCodigo;
let campoURL = document.getElementById("URL");
let campoNombre = document.getElementById("nombre");
let campoCategoria = document.getElementById("categoria");
let campoPrecio = document.getElementById("precio");
let campoDescripcion = document.getElementById("descripcion");
let campoPublicado = document.getElementById("publicar");
let campoDestacado = document.getElementById("destacar");

let formProducto = document.getElementById("formProducto");
let nuevoJuego = document.getElementById("nuevoJuego");
let btnDatosPrueba = document.getElementById("btnDatosPrueba");

let juegoExistente = false;
let listaProductos =
  JSON.parse(localStorage.getItem("arrayProductosKey")) || [];

function generarCodigo(length) {
  let caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(index);
  }
  return codigo;
}

campoURL.addEventListener("blur", () => {
  validarURL(campoURL);
});

campoNombre.addEventListener("blur", () => {
  campoRequerido(campoNombre);
});

campoCategoria.addEventListener("blur", () => {
  campoRequerido(campoCategoria);
});

campoPrecio.addEventListener("blur", () => {
  validarNumeros(campoPrecio);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

formProducto.addEventListener("submit", guardarProducto);
nuevoJuego.addEventListener("click", limpiarFormulario);
btnDatosPrueba.addEventListener("click", cargarDatosPrueba);

cargaInicial();

function guardarProducto(e) {
  e.preventDefault();
  listaProductos.map((item) => {
    item.nombre == campoNombre.value
      ? (juegoExistente = true)
      : (juegoExistente = false);
  });

  validarGeneral(
    campoURL,
    campoNombre,
    campoCategoria,
    campoPrecio,
    campoDescripcion
  );
  if (!juegoExistente) {
    crearProducto();
  } else {
    modificarJuego();
  }
}

function crearProducto() {
  campoCodigo = generarCodigo(6);
  let productoNuevo = new Producto(
    campoURL.value,
    campoCodigo,
    campoNombre.value,
    campoCategoria.value,
    campoPrecio.value,
    campoDescripcion.value,
    campoPublicado.value,
    campoDestacado.value
  );
  listaProductos.push(productoNuevo);

  limpiarFormulario();

  guadarLocalStorage();

  Swal.fire(
    "Producto creado!",
    "El producto fue creado correctamente!",
    "success"
  );
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiamos los values del formulario
  formProducto.reset();
  //resetear las clases de los input
  campoURL.className = "form-control";
  campoNombre.className = "form-control";
  campoCategoria.className = "form-control";
  campoPrecio.className = "form-control";
  campoDescripcion.className = "form-control";
  campoPublicado.className = "form-check-input";
  campoDestacado.className = "form-check-input";
  //resetear la varibale bandera o booleana para el caso de modificarProducto
  juegoExistente = false;
}

function guadarLocalStorage() {
  localStorage.setItem("arrayProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProducto = document.getElementById("catalogo");
  //usamos el operador de asignación por adición para concatenar con lo que ya tengo de contenido

  tablaProducto.innerHTML += `<li class="col-sm-12 col-md-4 col-lg-3">
    <div class="shop-card h-100">
      <figure
        class="card-banner img-holder"
        style="--width: 300; --height: 260"
        id="noPublicado"
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

      <div class="card-content h-100">
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
        <div class="d-flex justify-content-between flex-wrap">
          <button class="card-btn" data-bs-toggle="modal"
          data-bs-target="#NuevoJuego"onclick="prepararEdicionProducto('${producto.codigo}')">
            <img src="./assets/images/Edit_Admin.png" alt="edit">
          </button>
          
          <button class="card-btn"onclick="borrarJuego('${producto.codigo}')">
            <img src="./assets/images/Delet_Admin.png" alt="delet">
          </button>
          
          <button class="card-btn " onclick="destacarJuego('${producto.codigo}') id="${producto.codigo}">
            <img src="./assets/images/Black_Star_Admin.png" alt="highlight">
          </button>
        </div>
      </div>
    </div>
  </li>`;
  // if (!producto.publicado) {
  //    let color = document.querySelector("#noPublicado");
  //    color.className = "card-banner img-holder efectofoto";
  // }else{
  //   let color = document.querySelector("#noPublicado");
  //    color.className = "card-banner img-holder";
  // };
}
// if (producto.destacado) {
//   editarCheckbox(producto.codigo);
// }

function editarCheckbox(destacar) {
  listaProductos.map((item) => {
    if (item.codigo === destacar) {
      let starOn = document.querySelector(`#${destacar}`);
      let portada = document.getElementById("portadaAdmin");

      item.destacado = true;

      starOn.innerHTML =
        '<img src="./assets/images/Star_Admin.png" alt="highlight">';

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
      </div>`;
    } else if (item.destacado) {
      item.destacado = false;
      let starOff = document.querySelector(`#${item.codigo}`);
      starOff.innerHTML =
        '<img src="./assets/images/Black_Star_Admin.png" alt="highlight">';
    }
  });
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
  
  }
   */

window.prepararEdicionProducto = function (codigo) {
  //buscar el prodcuto en el array de productos
  let productoBuscado = listaProductos.find(
    (itemProducto) => itemProducto.codigo === codigo
  );

  //mostrar el producto en el formulario. No se debe de poder editar le código
  campoURL.value = productoBuscado.url;
  campoNombre.value = productoBuscado.nombre;
  campoCategoria.value = productoBuscado.categoria;
  campoPrecio.value = productoBuscado.precio;
  campoDescripcion.value = productoBuscado.descripcion;
  campoPublicado.value = productoBuscado.publicado;
  campoDestacado.value = productoBuscado.destacado;

  //modifico la variable bandera productoExistente
  juegoExistente = true;
};

function modificarJuego() {
  Swal.fire({
    title: "Seguro que desea modificar este producto?",
    text: "Podrá volver a editar este producto si lo desea",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posición del elemento que quiero modificar dentro de mi array de productos
      let indiceProducto = listaProductos.findIndex(
        (itemProducto) => itemProducto.codigo === campoCodigo.value
      );

      //modificar los valores del elemento couyo indice encontramos
      listaProductos[indiceProducto].url = campoProducto.value;
      listaProductos[indiceProducto].nombre = campoDescripcion.value;
      listaProductos[indiceProducto].categoria = campoCantidad.value;
      listaProductos[indiceProducto].precio = campoURL.value;
      listaProductos[indiceProducto].descripcion = campoDescripcion.value;
      listaProductos[indiceProducto].publicado = campoPublicado.value;
      listaProductos[indiceProducto].destacado = campoDestacado.value;

      //actualizar el localStorage
      guadarLocalStorage();

      //actualizar la tabla
      borrarJuego();
      cargaInicial();

      //mostrar cartel al usuario
      Swal.fire(
        "Producto modificado!",
        "El producto fue modificado correctamente!",
        "success"
      );

      //limpiar formulario y reseta la variable bandera
      limpiarFormulario();
    }
  });
}

function borrarCatalogo() {
  let catalogoJuegos = document.querySelector("#catalogo");
  catalogoJuegos.innerHTML = "";
}

window.borrarJuego = function (codigo) {
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
      borrarJuego();
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

function cargarDatosPrueba() {
  const datos = [
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/271590/hero_capsule.jpg?t=1695060909",
      codigo: "Fhgyvn",
      nombre: "Grand theft auto 5",
      categoria: "Mundo-abierto",
      precio: "59000",
      descripcion:
        "Grand Theft Auto V para PC ofrece a los jugadores la opción de explorar el galardonado mundo de Los Santos y el condado de Blaine con una resolución de 4K y disfrutar del juego a 60 fotogramas por segundo.",
      publicado: "true",
      destacado: "true",
    },
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/hero_capsule.jpg?t=1695308476",
      codigo: "i8f0Yj",
      nombre: "Cyberpunk 2077",
      categoria: "Rol",
      precio: "75500",
      descripcion:
        "Cyberpunk 2077 es un RPG de aventura y acción de mundo abierto ambientado en el futuro sombrío de Night City, una peligrosa megalópolis obsesionada con el poder, el glamur y las incesantes modificaciones corporales.",
      publicado: "true",
      destacado: "false",
    },
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/1938090/hero_capsule.jpg?t=1696521698",
      codigo: " LhyFyM",
      nombre: "Call of duty",
      categoria: "FPS",
      precio: "200000",
      descripcion:
        "Te damos la bienvenida a Call of Duty® HQ, el hogar de Call of Duty®: Modern Warfare® III, Call of Duty®: Modern Warfare® II y Warzone™.",
      publicado: "true",
      destacado: "false",
    },
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/2195250/hero_capsule.jpg?t=1696300539",
      codigo: "LhyFyM",
      nombre: "FC24",
      categoria: "Deportes",
      precio: "150500",
      descripcion:
        "EA SPORTS FC™ 24 te da la bienvenida a The World's Game: la experiencia futbolística más fiel hasta la fecha con HyperMotionV, PlayStyles optimizado por Opta y el motor mejorado de Frostbite™.",
      publicado: "true",
      destacado: "false",
    },
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1683618443",
      codigo: "jc2qG8",
      nombre: "Elden ring",
      categoria: "Dark-Soul",
      precio: "35500",
      descripcion:
        "EL NUEVO JUEGO DE ROL Y ACCIÓN DE AMBIENTACIÓN FANTÁSTICA. Álzate, Sinluz, y que la gracia te guíe para abrazar el poder del Círculo de Elden y encumbrarte como señor del Círculo en las Tierras Intermedias.",
      publicado: "true",
      destacado: "false",
    },
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/2440510/hero_capsule_alt_assets_1_latam.jpg?t=1696480140",
      codigo: "O5a0iG",
      nombre: "Forza motorsport",
      categoria: "Carreras",
      precio: "25500",
      descripcion:
        "Supera a tus rivales en la nueva carrera. Haz carreras con tus amigos en eventos multijugador arbitrados y compite con más de 500 coches en pistas de fama mundial con una IA de última generación, una física avanzada y estrategias que dependen de los neumáticos y el combustible.",
      publicado: "false",
      destacado: "false",
    },
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/570/hero_capsule.jpg?t=1682639497",
      codigo: "5U0r5N",
      nombre: "Dota 2",
      categoria: "Estrategia",
      precio: "13500",
      descripcion:
        "Cada día, millones de jugadores de todo el mundo entran en batalla como uno de los más de cien héroes de Dota. Y no importa si es su décima hora de juego o la milésima, siempre hay algo nuevo que descubrir.",
      publicado: "false",
      destacado: "false",
    },
    {
      url: "https://cdn.akamai.steamstatic.com/steam/apps/252490/hero_capsule.jpg?t=1693652810",
      codigo: "OZlwWF",
      nombre: "Rust",
      categoria: "Supervivencia",
      precio: "50500",
      descripcion:
        "El único objetivo en Rust es sobrevivir. Todo quiere que mueras: la vida salvaje de la isla y otros habitantes, el medio ambiente y otros supervivientes. Haz lo que sea necesario para durar una noche más.",
      publicado: "false",
      destacado: "false",
    },
  ];

  if (!localStorage.getItem("arrayProductosKey")) {
    localStorage.setItem("arrayProductosKey", JSON.stringify(datos));
    listaProductos = datos;
    listaProductos.forEach((itemProducto) => {
      crearFila(itemProducto);
    });
  }
}
