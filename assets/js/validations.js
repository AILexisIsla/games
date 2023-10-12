export const validarEmail = (input) => {
  let patron = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(patron.test(input.value) &&input.value!==''&&input.value!==undefined&&input.value!==null){
    input.className = 'form-control is-valid';
    return true;
  }else{
    input.className = 'form-control is-invalid';
    return false;
  }
  
};
export const validarNombre = (input) => {
  let patron = /^[A-Z][-'a-zA-Z]+,?\s[A-Z][-'a-zA-Z]{0,19}$/;
  if(patron.test(input.value) &&input.value!==''&&input.value!==undefined&&input.value!==null){
    input.className = 'form-control is-valid';
    return true;
  }else{
    input.className = 'form-control is-invalid';
    return false;
  }
};

export const validarPassword = (input) => {
  let patron = /^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/;
  if(patron.test(input.value) &&input.value!==''&&input.value!==undefined&&input.value!==null){
    input.className = 'form-control is-valid';
    return true;
  }else{
    input.className = 'form-control is-invalid';
    return false;
  }
};

export const validarRePassword = (inputR,inputP) => {
  if(inputR.value === inputP.value){
    inputR.className = 'form-control is-valid';
    return true;
  }else{
    inputR.className = 'form-control is-invalid';
    return false;
  }
};

export const validarTotal = (
  nombreCompletoRegistro,
  emailRegistro,
  passwordRegistro,
  rePasswordRegistro
) => {
  const nombreCompleto = validarNombre(nombreCompletoRegistro);
  const email = validarEmail(emailRegistro);
  const password = validarPassword(passwordRegistro);
  const rePassword = validarRePassword(rePasswordRegistro, passwordRegistro)

  return (nombreCompleto && email && password && rePassword);
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