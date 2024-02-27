import { getTableReferences, validateDependency } from "../js/funtions.js";
import {
  validateBoolean,
  validateDate,
  validateFloat,
  validateInteger,
  validatePlaca,
  validateSQlInyection,
} from "../js/validations.js";
import Price from "../models/price.model.js";

export const get_price = async (req, res) => {
  const price = await Price.findAll();

  res.json(await formt_price(price));
};
export const get_price_id = async (req, res) => {
  const { body } = req;
  const price = await Price.findByPk(body.id);

  if (!price) {
    return res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
  }
  res.json(await formt_price_(price));
};
export const post_price = async (req, res) => {
  const { body } = req;

  if (
    validateInteger(body.id) ||
    validateSQlInyection(body.descripcion) ||
    validateBoolean(body.estado) ||
    validateFloat(body.precioManoObra) ||
    validateFloat(body.precioCotizacion) ||
    validateDate(body.fecha) ||
    validatePlaca(body.placaVehiculo)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  const price_save = new Price({
    idCotizacion: body.id,
    descripcion: body.descripcion,
    estado: body.estado,
    valorManoObra: body.precioManoObra,
    valorCotizacion: body.precioCotizacion,
    fecha: body.fecha,
    vehiculos_placa: body.placaVehiculo,
  });

  try {
    await price_save.save();
    return res.status(201).json(price_save);
  } catch (error) {
    return res.status(520).json({
      message: "Ocurrio un error no esperado; Comunicate con el aministrador.",
    });
  }
};
export const put_price = async (req, res) => {
  const { body } = req;

  const price = await Price.findByPk(body.id);

  if (!price) {
    res.status(404).json({ message: "¡Error! Objeto no encontrado." });
    return;
  }

  if (
    validateInteger(body.id) ||
    validateSQlInyection(body.descripcion) ||
    validateBoolean(body.estado) ||
    validateFloat(body.precioManoObra) ||
    validateFloat(body.precioCotizacion) ||
    validateDate(body.fecha) ||
    validatePlaca(body.placaVehiculo)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  if (price.descripcion != body.descripcion && body.descripcion != undefined)
    price.update({ descripcion: body.descripcion });
  if (price.estado != body.estado && body.estado != undefined)
    price.update({ estado: body.estado });
  if (
    price.valorManoObra != body.precioManoObra &&
    body.precioManoObra != undefined
  )
    price.update({ valorManoObra: body.precioManoObra });
  if (
    price.valorCotizacion != body.precioCotizacion &&
    body.precioCotizacion != undefined
  )
    price.update({ valorCotizacion: body.precioCotizacion });
  if (price.fecha != body.fecha && body.fecha != undefined)
    price.update({ fecha: body.fecha });
  if (
    price.vehiculos_placa != body.placaVehiculo &&
    body.placaVehiculo != undefined
  )
    price.update({ vehiculos_placa: body.placaVehiculo });

  res.status(200).json(await formt_price_(price));
};
export const delete_price = async (req, res) => {
  const { body } = req;

  const price = await Price.findByPk(body.id);

  if (!price) {
    res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
    return;
  }

  const tablesReferencesPrice = await getTableReferences(
    "cotizaciones",
    "idCotizacion"
  );

  if (!(await validateDependency(tablesReferencesPrice, price.idCotizacion))) {
    price.destroy();
    res.status(200).json({ mesagge: "Cotizacion eliminado" });
  } else {
    price.update({ estado: false });
    res.status(200).json({ mesagge: "Servicio inactivado" });
  }
};

const formt_price = async (price) => {
  return await price.map((price_) => {
    return {
      id: price_.idCotizacion,
      descripcion: price_.descripcion,
      estado: price_.estado,
      precioManoObra: price_.valorManoObra,
      precioCotizacion: price_.valorCotizacion,
      fecha: price_.fecha,
      placaVehiculo: price_.vehiculos_placa,
    };
  });
};

const formt_price_ = async (price) => {
  return {
    id: price.idCotizacion,
    descripcion: price.descripcion,
    estado: price.estado,
    precioManoObra: price.valorManoObra,
    precioCotizacion: price.valorCotizacion,
    fecha: price.fecha,
    placaVehiculo: price.vehiculos_placa,
  };
};
