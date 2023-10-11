import {
  usuario,
  password
} from "./validations.js";

let campoMail = document.getElementById("mail");
let campoContrasena = document.getElementById("contrasena");
let botonAdmin = document.getElementById("adminBoton");

console.log(campoMail.value);
console.log(campoContrasena.value);
console.log(botonAdmin.value);

//registro

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

// //cuenta administrador
// function administrador() {
// const cuenta = [
//     {
//         mail: "rollinggame@gr.com",
//         pass: "Rolling-123",
//         admin: true,
//     },
// ]
// }

// //Bandera
// let usuarioExiste = false;
// let usuarios =
//   JSON.parse(localStorage.getItem("arrayUsuarios")) || [];

// campoMail.addEventListener("blur", () => {registroEmail(campoMail);});
// campoContrasena.addEventListener("blur", () => {registroEmail(campoContrasena);});
// campoAdmin.addEventListener("blur", () => {registroEmail(campoAdmin);})

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

//   //login

//   function login () {
//     const emailInput = document.getElementById("email").value;
//     const contraInput = document.getElementById("contra").value;

//     const usuario = usuarios.find(user => user.mail === emailInput && user.pass === contraInput);

//     if (usuario) {
//         if (usuario.admin) {
//             window.location.href = "./admin.html";
//         } else {
//             window.location.href = "./index.html";
//         }
//     }
//   }