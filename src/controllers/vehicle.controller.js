import { getTableReferences, validateDependency } from "../js/funtions.js";
import {
  validateInteger,
  validateMotorcycleColor,
  validateMotorcycleModel,
  validateMotorcycleReferencer,
  validatePlaca,
} from "../js/validations.js";
import Vehicle from "../models/vehicle.model.js";

export const get_vehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findAll();

    res.json(await formt_vehicle(vehicle));
  } catch (error) {
    res.json({
      message:
        "No se pudo ejecutar la consulta. ¡Comoniquese con el programador!",
    });
  }
};

export const get_vehicle_id = async (req, res) => {
  const { body } = req;
  const vehicle = await Vehicle.findByPk(body.placa);

  if (!vehicle) {
    return res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
  }

  res.json(await formt_vehicle_(vehicle));
};

export const post_vehicle = async (req, res) => {
  const { body } = req;
  if (
    validatePlaca(body.placa) ||
    validateMotorcycleReferencer(body.referencia) ||
    validateMotorcycleModel(body.modelo) ||
    validateMotorcycleColor(body.color) ||
    validateInteger(body.propietario)
  ) {
    return res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
  }
  const vehicle_save = new Vehicle({
    placa: body.placa,
    referencia: body.referencia,
    modelo: body.modelo,
    color: body.color,
    propietarios_idPropietario: body.propietario,
  });

  try {
    await vehicle_save.save(vehicle_save);
    res.status(201).json(await formt_vehicle_(vehicle_save));
  } catch (error) {
    console.log(error);
    res.status(520).json({
      message: "Ocurrio un error no esperado; Comunicate con el aministrador.",
    });
  }
};

export const put_vehicle = async (req, res) => {
  const { body } = req;

  const vehicle = await Vehicle.findByPk(body.placa);

  if (!vehicle) {
    return res.status(404).json({ message: "¡Error! Objeto no encontrado." });
  }

  if (
    validatePlaca(body.placa) ||
    validateMotorcycleReferencer(body.referencia) ||
    validateMotorcycleModel(body.modelo) ||
    validateMotorcycleColor(body.color) ||
    validateInteger(body.propietario)
  ) {
    return res
      .status(400)
      .json({ mesagge: "¡Error! valida el Json y vuelve a intentar." });
  }

  if (vehicle.referencia != body.referencia && body.referencia != undefined) {
    vehicle.update({ referencia: body.referencia });
  }
  if (vehicle.modelo != body.modelo && body.modelo != undefined) {
    vehicle.update({ modelo: body.modelo });
  }
  if (vehicle.color != body.color && body.color != undefined) {
    vehicle.update({ color: body.color });
  }
  if (
    vehicle.propietarios_idPropietario != body.propietario &&
    body.propietario != undefined
  ) {
    vehicle.update({ propietarios_idPropietario: body.propietario });
  }

  res.status(200).json(await formt_vehicle_(vehicle));
};

export const delete_vehicle = async (req, res) => {
  const { body } = req;

  const vehicle = await Vehicle.findByPk(body.placa);

  if (!vehicle) {
    res.status(404).json({ mesagge: "¡Error! Objeto no encontrado." });
    return;
  }

  const tablesReferencesVehicle = await getTableReferences(
    "vehiculos",
    "placa"
  );

  if (!(await validateDependency(tablesReferencesVehicle, vehicle.placa))) {
    vehicle.destroy();
    res.status(200).json({ mesagge: "Vehiculo eliminado" });
  } else {
    res.status(200).json({ mesagge: "No es posible eliminar" });
  }
};

const formt_vehicle = async (vehicle) => {
  return await vehicle.map((vehicle_) => {
    return {
      placa: vehicle_.placa,
      referencia: vehicle_.referencia,
      modelo: vehicle_.modelo,
      color: vehicle_.color,
      propietario: vehicle_.propietarios_idPropietario,
    };
  });
};

const formt_vehicle_ = async (vehicle) => {
  return {
    placa: vehicle.placa,
    referencia: vehicle.referencia,
    modelo: vehicle.modelo,
    color: vehicle.color,
    propietario: vehicle.propietarios_idPropietario,
  };
};
