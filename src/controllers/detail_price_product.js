import DetailPriceProduct from "../models/detail_price_product.model.js";
import {
  validateFloat,
  validateInteger,
  validateSQlInyection,
} from "../js/validations.js";

export const get_detail_price_product = async (req, res) => {
  const detail_detail_product = await DetailPriceProduct.findAll();

  res.json(await formt_detail_price_product(detail_detail_product));
};

export const get_detail_price_product_id = async (req, res) => {
  const { body } = req;
  const dpp = await DetailPriceProduct.findByPk(body.id);

  if (!dpp) {
    return res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
  }

  res.json(await format_detail_price_product_(dpp));
};

export const post_detail_price_product = async (req, res) => {
  const { body } = req;

  if (
    validateInteger(body.id) ||
    validateFloat(body.precioVenta) ||
    validateInteger(body.cantidad) ||
    validateSQlInyection(body.metodoPago) ||
    validateFloat(body.total) ||
    validateInteger(body.idCotizacio) ||
    validateInteger(body.idProducto)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  const DPP_save = new DetailPriceProduct({
    idDetalleCotizacionProducto: body.id,
    precioVenta: body.precioVenta,
    cantidad: body.cantidad,
    metodoPago: body.metodoPago,
    total: body.total,
    cotizaciones_idCotizacion: body.idCotizacio,
    productos_idProducto: body.idProducto,
  });

  try {
    await DPP_save.save(DPP_save);
    res.status(201).json(await format_detail_price_product_(DPP_save));
  } catch (error) {
    res.status(520).json({
      message: "Ocurrio un error no esperado; Comunicate con el aministrador.",
    });
  }
};

export const put_detail_price_product = async (req, res) => {
  const { body } = req;

  const dpp = await DetailPriceProduct.findByPk(body.id);

  if (
    validateInteger(body.id) ||
    validateFloat(body.precioVenta) ||
    validateInteger(body.cantidad) ||
    validateSQlInyection(body.metodoPago) ||
    validateFloat(body.total) ||
    validateInteger(body.idCotizacio) ||
    validateInteger(body.idProducto)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  if (dpp.cantidad != body.cantidad && body.cantidad != undefined)
    dpp.update({ cantidad: body.cantidad });
  if (dpp.metodoPago != body.metodoPago && body.metodoPago != undefined)
    dpp.update({ metodoPago: body.metodoPago });
  if (dpp.total != body.total && body.total != undefined)
    dpp.update({ total: body.total });
  if (dpp.descuento != body.descuento && body.descuento != undefined)
    dpp.update({ descuento: body.descuento });
  if (
    dpp.idCotizacio != body.cotizaciones_idCotizacion &&
    body.cotizaciones_idCotizacion != undefined
  )
    dpp.update({ idCotizacio: body.cotizaciones_idCotizacion });
  if (
    dpp.servicios_idServicio != body.idServicio &&
    body.idServicio != undefined
  )
    dpp.update({ servicios_idServicio: body.idServicio });

  res.status(200).json(await format_detail_price_product_(dpp));
};

export const delete_detail_price_product = async (req, res) => {
  const { body } = req;

  const dpp = await DetailPriceProduct.findByPk(body.id);

  if (!dpp) {
    res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
    return;
  }

  dpp.destroy();
  res.status(200).json({ mesagge: "detalleCotizacionProducto eliminado" });
};

const formt_detail_price_product = async (detail_dpp_product) => {
  return await detail_dpp_product.map((detail_price_product_) => {
    return {
      id: detail_price_product_.idDetalleCotizacionProducto,
      precioVenta: detail_price_product_.precioVenta,
      cantidad: detail_price_product_.cantidad,
      metodoPago: detail_price_product_.metodoPago,
      total: detail_price_product_.total,
      idCotizacio: detail_price_product_.cotizaciones_idCotizacion,
      idProducto: detail_price_product_.productos_idProducto,
    };
  });
};

const format_detail_price_product_ = async (detail_price_product) => {
  return {
    id: detail_price_product.idDetalleCotizacionProducto,
    precioVenta: detail_price_product.precioVenta,
    cantidad: detail_price_product.cantidad,
    metodoPago: detail_price_product.metodoPago,
    total: detail_price_product.total,
    idCotizacio: detail_price_product.cotizaciones_idCotizacion,
    idProducto: detail_price_product.productos_idProducto,
  };
};
