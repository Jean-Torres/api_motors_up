import {
  validateFloat,
  validateInteger,
  validateSQlInyection,
} from "../js/validations.js";

import DetailPriceService from "../models/detail_price_service.model.js";

export const get_detail_price_service = async (req, res) => {
  const dps = await DetailPriceService.findAll();
  res.json(await format_detail_price_service_(dps));
};

export const get_detail_price_service_id = async (req, res) => {
  const { body } = req;
  const dps = await DetailPriceService.findByPk(body.id);

  if (!dps) {
    return res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
  }

  res.json(await format_detail_price_service_(dps));
};

export const post_detail_price_service = async (req, res) => {
  const { body } = req;

  if (
    validateInteger(body.id) ||
    validateInteger(body.cantidad) ||
    validateSQlInyection(body.metodoPago) ||
    validateFloat(body.total) ||
    validateFloat(body.descuento) ||
    validateInteger(body.idCotizacio) ||
    validateInteger(body.idServicio)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  const DPS_save = new DetailPriceService({
    idDetalleCotizacionServicio: body.id,
    cantidad: body.cantidad,
    metodoPago: body.metodoPago,
    total: body.total,
    descuento: body.descuento,
    cotizaciones_idCotizacion: body.idCotizacio,
    servicios_idServicio: body.idServicio,
  });

  try {
    await DPS_save.save(DPS_save);
    res.status(201).json(await formt_detail_price_service(DPS_save));
  } catch (error) {
    res.status(520).json({
      message: "Ocurrio un error no esperado; Comunicate con el aministrador.",
    });
  }
};

export const put_detail_price_service = async (req, res) => {
  const { body } = req;

  const dps = await DetailPriceService.findByPk(body.id);

  if (
    validateInteger(body.id) ||
    validateInteger(body.cantidad) ||
    validateSQlInyection(body.metodoPago) ||
    validateFloat(body.total) ||
    validateFloat(body.descuento) ||
    validateInteger(body.idCotizacio) ||
    validateInteger(body.idServicio)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  if (dps.cantidad != body.cantidad && body.cantidad != undefined)
    dps.update({ cantidad: body.cantidad });
  if (dps.metodoPago != body.metodoPago && body.metodoPago != undefined)
    dps.update({ metodoPago: body.metodoPago });
  if (dps.total != body.total && body.total != undefined)
    dps.update({ total: body.total });
  if (dps.descuento != body.descuento && body.descuento != undefined)
    dps.update({ descuento: body.descuento });
  if (
    dps.idCotizacio != body.cotizaciones_idCotizacion &&
    body.cotizaciones_idCotizacion != undefined
  )
    dps.update({ idCotizacio: body.cotizaciones_idCotizacion });
  if (
    dps.servicios_idServicio != body.idServicio &&
    body.idServicio != undefined
  )
    dps.update({ servicios_idServicio: body.idServicio });

  res.status(200).json(await formt_detail_price_service(dps));
};

export const delete_detail_price_service = async (req, res) => {
  const { body } = req;

  const dps = await DetailPriceService.findByPk(body.id);

  if (!dps) {
    res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
    return;
  }

  dps.destroy();
  res.status(200).json({ mesagge: "detalleCotizacionServicio eliminado" });
};

const formt_detail_price_service = async (detail_dps_service) => {
  return await detail_dps_service.map((detail_dps_service_) => {
    return {
      id: detail_dps_service_.idDetalleCotizacionServicio,
      cantidad: detail_dps_service_.cantidad,
      metodoPago: detail_dps_service_.metodoPago,
      total: detail_dps_service_.total,
      descuento: detail_dps_service_.descuento,
      idCotizacio: detail_dps_service_.cotizaciones_idCotizacion,
      idServicio: detail_dps_service_.servicios_idServicio,
    };
  });
};

const format_detail_price_service_ = async (detail_dps_service) => {
  return {
    id: detail_dps_service.idDetalleCotizacionServicio,
    cantidad: detail_dps_service.cantidad,
    metodoPago: detail_dps_service.metodoPago,
    total: detail_dps_service.total,
    descuento: detail_dps_service.descuento,
    idCotizacio: detail_dps_service.cotizaciones_idCotizacion,
    idServicio: detail_dps_service.servicios_idServicio,
  };
};
