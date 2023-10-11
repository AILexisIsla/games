export class Usuario {
    constructor(
      parametroNombreCompleto,
      parametroEmail,
      parametroPassword,
      parametroAdmin
    ) {
      this.nombreCompleto = parametroNombreCompleto;
      this.email = parametroEmail;
      this.password = parametroPassword;
      this.admin = parametroAdmin;
    }
  
    //getters y setters
  
    get mostrarNombreCompleto() {
      return this.nombreCompleto;
    }
    get mostrarEmail() {
      return this.email;
    }
    get mostrarPassword() {
      return this.password;
    }
    get mostrarAdmin() {
      return this.admin;
    }
  
    set modificarNombreCompleto(nuevoNombreCompleto) {
      this.nombreCompleto = nuevoNombreCompleto;
    }
    set modificarEmail(nuevoEmail) {
      this.email = nuevoEmail;
    }
    set modificarPassword(nuevoPassword) {
      this.password = nuevoPassword;
    }
    set modificarAdmin(nuevoAdmin) {
      this.admin = nuevoAdmin;
    }
  }
  