import { DataTypes } from "sequelize";
import db from "../js/conexion.js";

const Vehicle = db.define(
  "vehiculos",
  {
    placa: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propietarios_idPropietario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "",
        key: "",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Vehicle;
