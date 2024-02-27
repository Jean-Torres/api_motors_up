import { DataTypes } from "sequelize";
import db from "../js/conexion.js";
import Vehicle from "./vehicle.model.js";

const Price = db.define(
  "cotizaciones",
  {
    idCotizacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    valorManoObra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valorCotizacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehiculos_placa: {
      type: DataTypes.STRING,
      references: {
        model: Vehicle,
        key: "placa",
      },
    },
  },
  {
    timestamps: false,
  },
  {
    timestamps: false,
  }
);

export default Price;