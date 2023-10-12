import {
  validarURL,
  campoRequerido,
  validarNumeros,
  validarGeneral,
} from "./validations.js";

import { Juego } from "./productclass.js";
let campoCodigo = document.getElementById("codigo");
let campoURL = document.getElementById("URL");
let campoNombre = document.getElementById("nombre");
let campoCategoria = document.getElementById("categoria");
let campoPrecio = document.getElementById("precio");
let campoDescripcion = document.getElementById("descripcion");
let campoPublicado = document.getElementById("publicar");
let campoDestacado = document.getElementById("destacar");

let formJuego = document.getElementById("formJuego");
let nuevoJuego = document.getElementById("nuevoJuego");
let btnDatosPrueba = document.getElementById("btnDatosPrueba");

let juegoExistente = false;
let catalogoJuegos = JSON.parse(localStorage.getItem("arrayCatalogoKey")) || [];

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

campoPublicado.addEventListener("click", () => {
});

campoDestacado.addEventListener("click", () => {
 });



formJuego.addEventListener("submit", guardarProducto);
nuevoJuego.addEventListener("click", limpiarFormulario);
btnDatosPrueba.addEventListener("click", cargarDatosPrueba);

cargaInicial();

function cargaInicial() {
  if (catalogoJuegos.length > 0) {
    catalogoJuegos.map((itemProducto) => crearFila(itemProducto));
  }
}

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

function guardarProducto(e) {
  e.preventDefault();

  catalogoJuegos.map((juego) => {
    if (campoCodigo !== ""){
      if(juego.codigo === campoCodigo.value){
        juegoExistente = true;
      }
    }else {
      juegoExistente = false;
    }     
  });
  
  if(validarGeneral(
    campoURL,
    campoNombre,
    campoCategoria,
    campoPrecio,
    campoDescripcion
  )){
    if (!juegoExistente) {
      crearProducto();
    } else {
      modificarJuego();
    };
  }
}

function crearProducto() {
  campoCodigo = generarCodigo(6);
  let productoNuevo = new Juego(
    campoURL.value,
    campoCodigo,
    campoNombre.value,
    campoCategoria.value,
    campoPrecio.value,
    campoDescripcion.value,
    campoPublicado.checked,
    campoDestacado.checked
  );
  catalogoJuegos.push(productoNuevo);

  guadarLocalStorage();
  crearFila(productoNuevo);
  limpiarFormulario();
  borrarCatalogo();
  cargaInicial();
  juegoExistente = false;
  loca.reload();
  Swal.fire(
    "Producto creado!",
    "El producto fue creado correctamente!",
    "success"
  );
}

function limpiarFormulario() {
  formJuego.reset();

  campoURL.className = "form-control";
  campoNombre.className = "form-control";
  campoCategoria.className = "form-control";
  campoPrecio.className = "form-control";
  campoDescripcion.className = "form-control";
  campoPublicado.className = "form-check-input";
  campoDestacado.className = "form-check-input";

  juegoExistente = false;
}

function guadarLocalStorage() {
  localStorage.setItem("arrayCatalogoKey", JSON.stringify(catalogoJuegos));
}

function crearFila(juego) {
  let catalogo = document.getElementById("catalogo");

  catalogo.innerHTML += `<li class="col-sm-12 col-md-4 col-lg-3">
    <div class="shop-card h-100">
      <figure
        class="card-banner img-holder"
        style="--width: 300; --height: 260"
        id="${juego.codigo}noPublicado"
      >
        <img
          src="${juego.Url}"
          width="300"
          height="260"
          loading="lazy"
          alt="Virtual Reality Smiled"
          class="img-cover"
        />
      </figure>

      <div class="card-content h-100">
        <a href="#" class="card-badge skewBg">${juego.categoria}</a>

        <h3 class="h3">
          <a href="#" class="card-title">${juego.nombre}</a>
        </h3>
        
        <div class="card-body text-white d-block w-25px">
          <p>Codigo: ${juego.codigo}</p>
          <p>Descripcion: ${juego.descripcion}</p>
          <div class="card-wrapper">
          <p class="card-price">ARS$ ${juego.precio}</p>
          </div>
          <div class="d-flex justify-content-between flex-wrap">
            <button class="card-btn" data-bs-toggle="modal"
            data-bs-target="#NuevoJuego"onclick="prepararEdicionJuego('${juego.codigo}')">
              <img src="./assets/images/Edit_Admin.png" alt="edit">
            </button>
            
            <button class="card-btn" onclick="borrarJuego('${juego.codigo}')">
              <img src="./assets/images/Delet_Admin.png" alt="delet">
            </button>
            
            <button class="card-btn" onClick="destacable('${juego.codigo}')">
            <figure class="w-100 h-auto" id="${juego.codigo}">
              <img src="./assets/images/Black_Star_Admin.png" alt="highlight w-100 h-auto">
            </figure>
            </button>
          </div>
        </div>

        </div>
    </div>
  </li>`;
}

window.prepararEdicionJuego = function (codigo) {
  let juegoBuscado = catalogoJuegos.find((juego) => juego.codigo === codigo);

  campoCodigo.value = juegoBuscado.codigo;
  campoURL.value = juegoBuscado.Url;
  campoNombre.value = juegoBuscado.nombre;
  campoCategoria.value = juegoBuscado.categoria;
  campoPrecio.value = juegoBuscado.precio;
  campoDescripcion.value = juegoBuscado.descripcion;
  campoPublicado.checked = juegoBuscado.publicado;
  campoDestacado.checked = juegoBuscado.destacado;

  juegoExistente = false;
};

function modificarJuego() {
  Swal.fire({
    title: "Seguro que desea modificar este Juego?",
    text: "Podrá volver a editar este Juego si lo desea",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let indiceJuego = catalogoJuegos.findIndex(
        (itemJuego) => itemJuego.codigo === campoCodigo.value
      );

      catalogoJuegos[indiceJuego].Url = campoURL.value;
      catalogoJuegos[indiceJuego].nombre = campoNombre.value;
      catalogoJuegos[indiceJuego].categoria = campoCategoria.value;
      catalogoJuegos[indiceJuego].precio = campoPrecio.value;
      catalogoJuegos[indiceJuego].descripcion = campoDescripcion.value;
      catalogoJuegos[indiceJuego].publicado = campoPublicado.value;
      catalogoJuegos[indiceJuego].destacado = campoDestacado.value;

      borrarJuego();
      borrarCatalogo();
      guadarLocalStorage();
      Swal.fire(
        "Producto modificado!",
        "El producto fue modificado correctamente!",
        "success"
      );
      cargaInicial();
      limpiarFormulario();
      juegoExistente = false;
    }
  });
}

function borrarCatalogo() {
  let catalogoJuegos = document.querySelector("#catalogo");
  catalogoJuegos.innerHTML = "";
}

window.borrarJuego = function (codigo) {
  Swal.fire({
    title: "Seguro que desea eliminar este producto?",
    text: "La acción no prodrá revertirse!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let nuevacatalogoJuegos = catalogoJuegos.filter(
        (itemProducto) => itemProducto.codigo !== codigo
      );
      catalogoJuegos = nuevacatalogoJuegos;

      guadarLocalStorage();
      Swal.fire(
        "Producto eliminado!",
        "El producto fue eliminado correctamente!",
        "success"
      );
      borrarCatalogo();
      cargaInicial();
    }
  });
};


function cargarDatosPrueba() {
  const datos = [
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/271590/hero_capsule.jpg?t=1695060909",
      codigo: "Fhgyvn",
      nombre: "Grand theft auto 5",
      categoria: "Mundo-abierto",
      precio: "59000",
      descripcion:
        "Grand Theft Auto V para PC ofrece a los jugadores la opción de explorar el galardonado mundo de Los Santos y el condado de Blaine con una resolución de 4K y disfrutar del juego a 60 fotogramas por segundo.",
      publicado: true,
      destacado: true,
    },
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/hero_capsule.jpg?t=1695308476",
      codigo: "i8f0Yj",
      nombre: "Cyberpunk 2077",
      categoria: "Rol",
      precio: "75500",
      descripcion:
        "Cyberpunk 2077 es un RPG de aventura y acción de mundo abierto ambientado en el futuro sombrío de Night City, una peligrosa megalópolis obsesionada con el poder, el glamur y las incesantes modificaciones corporales.",
      publicado: true,
      destacado: false,
    },
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/1938090/hero_capsule.jpg?t=1696521698",
      codigo: " LhyFyM",
      nombre: "Call of duty",
      categoria: "FPS",
      precio: "200000",
      descripcion:
        "Te damos la bienvenida a Call of Duty® HQ, el hogar de Call of Duty®: Modern Warfare® III, Call of Duty®: Modern Warfare® II y Warzone™.",
      publicado: true,
      destacado: false,
    },
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/2195250/hero_capsule.jpg?t=1696300539",
      codigo: "LhyFyM",
      nombre: "FC24",
      categoria: "Deportes",
      precio: "150500",
      descripcion:
        "EA SPORTS FC™ 24 te da la bienvenida a The World's Game: la experiencia futbolística más fiel hasta la fecha con HyperMotionV, PlayStyles optimizado por Opta y el motor mejorado de Frostbite™.",
      publicado: true,
      destacado: false,
    },
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1683618443",
      codigo: "jc2qG8",
      nombre: "Elden ring",
      categoria: "Dark-Soul",
      precio: "35500",
      descripcion:
        "EL NUEVO JUEGO DE ROL Y ACCIÓN DE AMBIENTACIÓN FANTÁSTICA. Álzate, Sinluz, y que la gracia te guíe para abrazar el poder del Círculo de Elden y encumbrarte como señor del Círculo en las Tierras Intermedias.",
      publicado: true,
      destacado: false,
    },
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/2440510/hero_capsule_alt_assets_1_latam.jpg?t=1696480140",
      codigo: "O5a0iG",
      nombre: "Forza motorsport",
      categoria: "Carreras",
      precio: "25500",
      descripcion:
        "Supera a tus rivales en la nueva carrera. Haz carreras con tus amigos en eventos multijugador arbitrados y compite con más de 500 coches en pistas de fama mundial con una IA de última generación, una física avanzada y estrategias que dependen de los neumáticos y el combustible.",
      publicado: false,
      destacado: false,
    },
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/570/hero_capsule.jpg?t=1682639497",
      codigo: "5U0r5N",
      nombre: "Dota 2",
      categoria: "Estrategia",
      precio: "13500",
      descripcion:
        "Cada día, millones de jugadores de todo el mundo entran en batalla como uno de los más de cien héroes de Dota. Y no importa si es su décima hora de juego o la milésima, siempre hay algo nuevo que descubrir.",
      publicado: false,
      destacado: false,
    },
    {
      Url: "https://cdn.akamai.steamstatic.com/steam/apps/252490/hero_capsule.jpg?t=1693652810",
      codigo: "OZlwWF",
      nombre: "Rust",
      categoria: "Supervivencia",
      precio: "50500",
      descripcion:
        "El único objetivo en Rust es sobrevivir. Todo quiere que mueras: la vida salvaje de la isla y otros habitantes, el medio ambiente y otros supervivientes. Haz lo que sea necesario para durar una noche más.",
      publicado: false,
      destacado: false,
    },
  ];

  if (!localStorage.getItem("arrayCatalogoKey")) {
    localStorage.setItem("arrayCatalogoKey", JSON.stringify(datos));
    catalogoJuegos = datos;
    catalogoJuegos.forEach((itemProducto) => {
      crearFila(itemProducto);
    });
  }
}
