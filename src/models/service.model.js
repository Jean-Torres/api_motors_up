import { DataTypes } from "sequelize";
import db from "../js/conexion.js";

const Service = db.define(
  "servicios",
  {
    idServicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombreServicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Service;
