export class Producto {
    constructor(
      parametroUrl,
      parametroCodigo,
      parametroNombre,
      parametroCategoria,
      parametroPrecio,
      parametroDescripcion,
      parametroPublicado,
      parametroDestacado,
    ) {
      this.url = parametroUrl;
      this.codigo = parametroCodigo;
      this.nombre = parametroNombre;
      this.categoria = parametroCategoria;
      this.precio = parametroPrecio;
      this.descripcion = parametroDescripcion;
      this.publicado = parametroPublicado;
      this.destacado = parametroDestacado;
    }
  
    //getters y setters
  
    get mostrarUrl() {
      return this.url;
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
  
    set modificarUrl(nuevaUrl) {
      this.url = nuevaUrl;
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
  