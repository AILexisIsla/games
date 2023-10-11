import {
  validarNombre,
  validarEmail,
  validarPassword,
  validarTotal,
  campoRequerido,
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
  
});
emailRegistro.addEventListener("blur", () => {
  // validarEmail(emailRegistro);
});
passwordRegistro.addEventListener("blur", () => {
  // validarPassword(passwordRegistro);
});
rePasswordRegistro.addEventListener("blur", () => {
  // validarPassword(rePasswordRegistro);
});

cargarUsuariosRandom();

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

function guadarLocalStorage (){
  localStorage.setItem("arrayUsuarioKey", JSON.stringify(arrayUsuarios))
}


//////////////////////////////////////
// const campoRegistro = (input) => {
//     if (input.value.trim()?.length > 0&&input.value!==''&&input.value!==undefined&&input.value!==null) {
//       input.className = 'form-control is-valid';
//       return true;
//     } else {
//       input.className = 'form-control is-invalid';
//       return false;
//     }
//   };



// function registroEmail(input){
//     let email = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

//     if (email.test(input.value) && input.value !== '' && input.value !==undefined && input.value !== null) {
//         input.className = 'form-control is-valid';
//         return true;
//       } else {
//         input.className = 'form-control is-invalid';
//         return false;
//       }
// }

// function registroContrasena(input) {
//     let pass = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/;

//     if (pass.test(input.value) && input.value !== "" && input.value.trim()?.length > 6) {
//         input.className = 'form-control is-valid';
//       return true;
//     } else {
//         input.className = 'form-control is-invalid';
//       return false;
//     }
// }

// //agrega false automaticamente

// const validarRegistro = (
//     campoContraseña, campoMail
// ) => {
//     registroEmail(campoMail);
//     registroContrasena(campoContrasena);
// }


// //Bandera
// let usuarioExiste = false;
// let usuarios =
//   JSON.parse(localStorage.getItem("arrayUsuarios")) || [];

// // campoMail.addEventListener("blur", () => {registroEmail(campoMail);});
// // campoContrasena.addEventListener("blur", () => {registroEmail(campoContrasena);});
// // campoAdmin.addEventListener("blur", () => {registroEmail(campoAdmin);})

// function crearUsuario(e){
//     const nuevoMail = campoMail.value;
    
//     // Comprueba si el correo electrónico ya existe en la base de datos
//     const usuarioExistente = usuarios.find(user => user.mail === nuevoMail);

//     if (usuarioExistente) {
//         Swal.fire(
//             "Error",
//             "El correo electrónico ya está registrado.",
//             "error"
//         );
//     } else{
//         let usuarioNuevo = {
//             mail: campoMail.value,
//             pass: campoContrasena.value,
//             admin: false,
//         }
    
//         usuarios.push(usuarioNuevo);
    
//         limpiarRegistroR();
    
//         guadarLocalStorageR();
    
//         Swal.fire(
//             "Usuario creado",
//             "El usuario fue creado correctamente!",
//             "success"
//           );
//     }
// }

// function guadarLocalStorageR() {
//     localStorage.setItem("arrayUsuarios", JSON.stringify(usuarios));
//   }
/////////////////////////////////////////////////////
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
    admin.value,
  );
  arrayUsuarios.push(nuevoUsuario)

  guardarLocalStorage();
  crearFila(nuevoUsuario);
  usuarioExiste = false;
  Swal.fire(
    "Usuario creado!",
    "El usuario fue creado correctamente!",
    "success"
  );
};