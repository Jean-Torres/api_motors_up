export const validateDate = (date) => isNaN(Date.parse(date));

export const validatePlaca = (placa) => {
  let regexPlaca = /^[A-Za-z\d]{6}$/;

  if (regexPlaca.test(placa)) return false;
  else return true;
};

export const validateFloat = (float) => {
  let regexFloat = /^[-+]?\d*\.?\d+$/;

  if (regexFloat.test(float)) return false;
  else return true;
};

export const validateInteger = (int) => {
  let regexFloat = /^[-+]?\d+$/;

  if (regexFloat.test(int)) return false;
  else return true;
};

export const validateBoolean = (boolean) => {
  if (boolean == null || boolean == undefined) return true;
  const format_boolean = boolean.toString().toLowerCase();

  if (format_boolean == "true" || format_boolean == "false") return false;
  else return true;
};

export const validateSQlInyection = (cadenaString) => {
  let regexSQL = /\b(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|DROP|ALTER)\b/i;

  if (regexSQL.test(cadenaString)) return true;
  else return false;
};

export const validateMotorcycleReferencer = (referencia) => {
  let regexReferencia = /^[A-Za-z0-9]{1,35}$/;

  if (regexReferencia.test(referencia)) return false;
  else return true;
};

export const validateMotorcycleModel = (modelo) => {
  let regexModelo = /^[A-Za-z0-9\s\-_.]{1,30}$/;

  if (regexModelo.test(modelo)) return false;
  else return true;
};

export const validateMotorcycleColor = (color) => {
  let regexColor = /^([A-Za-z]+,?\s*)+$/;

  if (regexColor.test(color)) return false;
  else return true;
};
