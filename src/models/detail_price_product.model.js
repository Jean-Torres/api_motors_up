import { DataTypes } from "sequelize";
import db from "../js/conexion.js";
import Price from "./price.model.js";

const DetailPriceProduct = db.define(
  "detallecotizacionproducto",
  {
    idDetalleCotizacionProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    precioVenta: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes,
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
    cotizaciones_idCotizacion: {
      type: DataTypes.INTEGER,
      references: {
        model: Price,
        key: "idCotizacion",
      },
    },
    productos_idProducto: {
      type: DataTypes.INTEGER,
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

export default DetailPriceProduct;
