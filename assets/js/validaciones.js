export const campoRequerido = (input) => {
    if (input.value.trim()?.length > 0&&input.value!==''&&input.value!==undefined&&input.value!==null) {
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
    
      validarURL(campoURL);
      campoRequerido(campoNombre);
      campoRequerido(campoCategoria);
      validarNumeros(campoPrecio);
      campoRequerido(campoDescripcion);
  };