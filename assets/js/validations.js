export const validarUsuario = (input) => {

};

export const validarEmail = (input) => {
  
};
export const validarNombre = (input) => {

};

export const validarPassword = (input) => {

};

export const validarTotal = (

) => {

};

export const campoRequerido = (input) => {
    if (input.value.trim()?.length > 0 &&input.value!==''&&input.value!==undefined&&input.value!==null) {
      input.className = 'form-control is-valid';
      return true;
    } else {
      input.className = 'form-control is-invalid';
      return false;
    }
  };
  
  export const validarNumeros = (input) => {
    let patron = /^[0-9]{1,999999}$/;
    if (patron.test(input.value)&&input.value!==''&&input.value!==undefined&&input.value!==null) {
      input.className = 'form-control is-valid';
      return true;
    } else {
      input.className = 'form-control is-invalid';
      return false;
    }
  };
  
  export const validarURL = (input) => {
    let patron = /^https?:\/\/[/#?]?.*$/;
    if (patron.test(input.value)&&input.value!==''&&input.value!==undefined&&input.value!==null) {
      input.className = 'form-control is-valid';
      return true;
    } else {
      input.className = 'form-control is-invalid';
      return false;
    }
  };

  export  const validarGeneral = (
    campoURL,
    campoNombre,
    campoCategoria,
    campoPrecio,
    campoDescripcion,
  ) => {
      const URL = validarURL(campoURL);
      const nombre = campoRequerido(campoNombre);
      const categoria = campoRequerido(campoCategoria);
      const precio = validarNumeros(campoPrecio);
      const descripcion = campoRequerido(campoDescripcion);

      return (URL && nombre && categoria && precio && descripcion);
  };