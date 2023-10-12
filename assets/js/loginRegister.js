import {
  validarNombre,
  validarEmail,
  validarPassword,
  validarRePassword,
  validarTotal
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

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  arrayUsuarios.map((usuario) => {
    if (usuario.email === emailLogin.value && usuario.password === passwordLogin.value) {
      if (usuario.admin){
      botonAdmin.className = 'navbar-link skewBg';
      logoUsuario.innerHTML = '<img src="../assets/images/usuario_admin.png" alt="logo de usuario">'
      window.location.href = "/admin.html";
      }else{
        logoUsuario.innerHTML = '<img src="./assets/images/usuario_admin.png" alt="logo de usuario">'
        window.location.href = "/index.html";
      }
    } else {
      emailLogin.className = 'form-control is-invalid';
      passwordLogin.className = 'form-control is-invalid';
      alert.className = "alert alert-danger my-3";
    }
  })
});

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
  console.log(terminos.checked);
});

formRegistro.addEventListener("submit", guardarUsuario);


cargarUsuariosRandom();

function guardarUsuario (e){
  e.preventDefoult();

  arrayUsuarios.map((usuario) => {
    if(emailRegistro.value !== usuario.email){
      console.log('desde guardar usuario');
      usuarioExistente = false;
    }else{
      usuarioExistente = true;
      console.log('el usuario ya existe');
      console.log('desea recuperar clave?');
    }

    if(validarTotal(
      nombreCompletoRegistro,
      emailRegistro,
      passwordRegistro,
      rePasswordRegistro
    )){
      if(!usuarioExistente){
        crearUsuario();
      }else{
        recuperoUsuario();
      }
    }

  })

}

function limpiarFormulario(){
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

function guardarLocalStorage (){
  localStorage.setItem("arrayUsuarioKey", JSON.stringify(arrayUsuarios))
}

//almacenar datos de usuarios
//datos random
function cargarUsuariosRandom(){
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
  if(!localStorage.getItem("arrayUsuariosKey")){
    localStorage.setItem("arrayUsuariosKey", JSON.stringify(datosUsuarios));
    arrayUsuarios = datosUsuarios;
  };
 };

cargaDeUsuarios();
function cargaDeUsuarios(){
  if(arrayUsuarios > 0){
    arrayUsuarios.map((usuario) => crearUsuario(usuario));
  }
};

function crearUsuario (){
  let nuevoUsuario = new Usuario (
    nombreCompleto.value,
    email.value,
    password.value,
    admin = false,
  );
  arrayUsuarios.push(nuevoUsuario)

  guardarLocalStorage();
  limpiarFormulario();
  carga
  usuarioExistente = false;
  Swal.fire(
    "Usuario creado!",
    "El usuario fue creado correctamente!",
    "success"
  );
};