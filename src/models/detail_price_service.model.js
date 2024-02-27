import { DataTypes } from "sequelize";
import db from "../js/conexion.js";
import Service from "./service.model.js";
import Price from "./price.model.js";

const DetailPriceService = db.define(
  "detallecotizacionservicio",
  {
    idDetalleCotizacionServicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metodoPago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cotizaciones_idCotizacion: {
      type: DataTypes.INTEGER,
      references: {
        model: Price,
        key: "idCotizacion",
      },
    },
    servicios_idServicio: {
      type: DataTypes.INTEGER,
      references: {
        model: Service,
        key: "idServicio",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default DetailPriceService;
