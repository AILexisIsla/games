export class Juego {
    constructor(
      parametroURL,
      parametroCodigo,
      parametroNombre,
      parametroCategoria,
      parametroPrecio,
      parametroDescripcion,
      parametroPublicado,
      parametroDestacado,
    ) {
      this.Url = parametroURL;
      this.codigo = parametroCodigo;
      this.nombre = parametroNombre;
      this.categoria = parametroCategoria;
      this.precio = parametroPrecio;
      this.descripcion = parametroDescripcion;
      this.publicado = parametroPublicado;
      this.destacado = parametroDestacado;
    }
  
    //getters y setters
  
    get mostrarURL() {
      return this.Url;
    }
    get mostrarCodigo() {
      return this.codigo;
    }
    get mostrarNombre() {
      return this.nombre;
    }
    get mostrarCategoria() {
      return this.categoria;
    }
    get mostrarPrecio() {
      return this.precio;
    }
    get mostrarDescripcion() {
      return this.descripcion;
    }
    get mostrarPublicado() {
      return this.publicado;
    }
    get mostrarDestacado() {
      return this.destacado;
    }
  
    set modificarURL(nuevaURL) {
      this.Url = nuevaURL;
    }
    set modificarCodigo(nuevoCodigo) {
      this.codigo = nuevoCodigo;
    }
    set modificarNombre(nuevoNombre) {
      this.nombre = nuevoNombre;
    }
    set modificarCategoria(nuevaCategoria) {
      this.categoria = nuevaCategoria;
    }
    set modificarPrecio(nuevoPrecio) {
      this.precio = nuevoPrecio;
    }
    set modificarDescripcion(nuevoDescripcion) {
      this.descripcion = nuevoDescripcion;
    }
    set modificarPublicado(nuevoPublicado) {
      this.publicado = nuevoPublicado;
    }
    set modificarDestacado(nuevoDestacado) {
      this.destacado = nuevoDestacado;
    }
  }
  