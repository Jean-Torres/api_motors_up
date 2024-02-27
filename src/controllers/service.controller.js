import { getTableReferences, validateDependency } from "../js/funtions.js";
import {
  validateBoolean,
  validateInteger,
  validateSQlInyection,
} from "../js/validations.js";
import Service from "../models/service.model.js";

export const get_service = async (req, res) => {
  const service = await Service.findAll();
  res.json(await formt_service(service));
};
export const get_service_id = async (req, res) => {
  const { body } = req;
  const service = await Service.findByPk(body.id);

  if (!service) {
    return res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
  }

  res.json(await formt_service_(service));
};
export const post_service = async (req, res) => {
  const { body } = req;

  if (
    validateInteger(body.id) ||
    validateSQlInyection(body.nombre) ||
    validateSQlInyection(body.descripcion) ||
    validateBoolean(body.estado)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  const service_save = new Service({
    idServicio: body.id,
    nombreServicio: body.nombre,
    descripcion: body.descripcion,
    estado: body.estado,
  });

  try {
    await service_save.save(service_save);
    res.status(201).json(await formt_service_(service_save));
  } catch (error) {
    res.status(520).json({
      message: "Ocurrio un error no esperado; Comunicate con el aministrador.",
    });
  }
};
export const put_service = async (req, res) => {
  const { body } = req;

  const service = await Service.findByPk(body.id);

  if (!service) {
    res.status(404).json({ message: "¡Error! Objeto no encontrado." });
    return;
  }

  if (
    validateInteger(body.id) ||
    validateSQlInyection(body.nombre) ||
    validateSQlInyection(body.descripcion) ||
    validateBoolean(body.estado)
  ) {
    res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
    return;
  }

  if (service.nombreServicio != body.nombre && body.nombre != undefined)
    service.update({ nombreServicio: body.nombre });
  if (service.descripcion != body.descripcion && body.descripcion != undefined)
    service.update({ descripcion: body.descripcion });
  if (service.estado != body.estado && body.estado != undefined)
    service.update({ estado: body.estado });

  res.status(200).json(await formt_service_(service));
};
export const delete_service = async (req, res) => {
  const { body } = req;

  const service = await Service.findByPk(body.id);

  if (!service) {
    res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
    return;
  }

  const tablesReferencesService = await getTableReferences(
    "servicios",
    "idServicio"
  );

  if (
    !(await validateDependency(tablesReferencesService, service.idServicio))
  ) {
    service.destroy();
    res.status(200).json({ mesagge: "Servicio eliminado" });
  } else {
    service.update({ estado: false });
    res.status(200).json({ mesagge: "Servicio inactivado" });
  }
};

const formt_service = async (service) => {
  return await service.map((servic) => {
    return {
      id: servic.idServicio,
      nombre: servic.nombreServicio,
      descripcion: servic.descripcion,
      estado: servic.estado,
    };
  });
};

const formt_service_ = async (service) => {
  return {
    id: service.idServicio,
    nombre: service.nombreServicio,
    descripcion: service.descripcion,
    estado: service.estado,
  };
};
