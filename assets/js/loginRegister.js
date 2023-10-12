import {
  validarNombre,
  validarEmail,
  validarPassword,
  validarRePassword,
  validarTotal,
} from "./validations.js";

import { Usuario } from "./usuariosclass.js";

//formulario del login
let emailLogin = document.getElementById("emailLogin");
let passwordLogin = document.getElementById("passwordLogin");
let sesionLogin = document.getElementById("sesionLogin");
let formLogin = document.getElementById("formLogin");
let alert = document.querySelector("#alert");

//formulario del registro de usuario
let nombreCompletoRegistro = document.getElementById("nombreCompletoRegistro");
let emailRegistro = document.getElementById("emailRegistro");
let passwordRegistro = document.getElementById("passwordRegistro");
let rePasswordRegistro = document.getElementById("rePasswordRegistro");
let terminos = document.getElementById("terminos");
let formRegistro = document.getElementById("formRegistro");

let botonAdmin = document.getElementById("adminBoton");
let logoUsuario = document.getElementById("logoUsuario");
let usuarioExistente = false;

let arrayUsuarios = JSON.parse(localStorage.getItem("arrayUsuariosKey")) || [];

formLogin.addEventListener("submit", logueo);

nombreCompletoRegistro.addEventListener("blur", () => {
  validarNombre(nombreCompletoRegistro);
});
emailRegistro.addEventListener("blur", () => {
  validarEmail(emailRegistro);
});
passwordRegistro.addEventListener("blur", () => {
  validarPassword(passwordRegistro);
});
rePasswordRegistro.addEventListener("blur", () => {
  validarRePassword(rePasswordRegistro, passwordRegistro);
});
terminos.addEventListener("click", () => {
  
});

formRegistro.addEventListener("submit", guardarUsuario);

cargarUsuariosRandom();

function logueo(e) {
  e.preventDefault();

  arrayUsuarios.map((usuario) => {
    if (
      usuario.email !== emailLogin.value &&
      usuario.password !== passwordLogin.value
    ) {
      emailLogin.className = "form-control is-invalid";
      passwordLogin.className = "form-control is-invalid";
      //alert.className = "alert alert-danger my-3";
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña invalido',
      })
    } else {
      usuarioExistente = true;
    }

    if (usuarioExistente) {
      if (usuario.admin) {
        botonAdmin.className = "navbar-link skewBg";
        logoUsuario.innerHTML =
        '<img src="../assets/images/usuario_admin.png" alt="logo de usuario" id="logoUsuario" class="img-fluid">';
        //window.location.href = "/admin.html";
      } else {
        logoUsuario.innerHTML =
        '<img src="./assets/images/usuario_admin.png" alt="logo de usuario">';
        window.location.href = "/index.html";
      }
      // alert.className = "alert alert-danger my-3 d-none";
    }

    limpiarFormulario();
  });
}

function guardarUsuario(e) {
  e.preventDefoult();

  arrayUsuarios.map((usuario) => {
    if (emailRegistro.value !== usuario.email) {
      usuarioExistente = false;
    } else {
      usuarioExistente = true;
    }

    if (
      validarTotal(
        nombreCompletoRegistro,
        emailRegistro,
        passwordRegistro,
        rePasswordRegistro
      )
    ) {
      if (!usuarioExistente) {
        crearUsuario();
      } else {
        recuperoUsuario();
      }
    }
  });
}

function limpiarFormulario() {
  formLogin.reset();
  emailLogin.className = "form-control";
  passwordLogin.className = "form-control";
  sesionLogin.className = "form-check-input";
  nombreCompletoRegistro.className = "form-control";
  emailRegistro.className = "form-control";
  passwordRegistro.className = "form-control";
  rePasswordRegistro.className = "form-control";
  usuarioExistente = false;
}

function guardarLocalStorage() {
  localStorage.setItem("arrayUsuarioKey", JSON.stringify(arrayUsuarios));
}

//almacenar datos de usuarios
//datos random
function cargarUsuariosRandom() {
  const datosUsuarios = [
    {
      nombreCompleto: "theRollingGame",
      email: "theRollingGameAdmin@gmail.com",
      password: "Admin2023",
      admin: true,
    },
    {
      nombreCompleto: "theRollingGame",
      email: "theRollingGameUsuario@gmail.com",
      password: "Usuario2023",
      admin: false,
    },
  ];
  if (!localStorage.getItem("arrayUsuariosKey")) {
    localStorage.setItem("arrayUsuariosKey", JSON.stringify(datosUsuarios));
    arrayUsuarios = datosUsuarios;
  }
}

cargaDeUsuarios();
function cargaDeUsuarios() {
  if (arrayUsuarios > 0) {
    arrayUsuarios.map((usuario) => crearUsuario(usuario));
  }
}

function crearUsuario() {
  let nuevoUsuario = new Usuario(
    nombreCompleto.value,
    email.value,
    password.value,
    (admin = false)
  );
  arrayUsuarios.push(nuevoUsuario);

  guardarLocalStorage();
  limpiarFormulario();
  carga;
  usuarioExistente = false;
  Swal.fire(
    "Usuario creado!",
    "El usuario fue creado correctamente!",
    "success"
  );
}
