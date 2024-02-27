import express from "express";
import morgan from "morgan";
import cors from "cors";

import routers_vehicle from "./routers/vehicle.routes.js";
import routers_service from "./routers/service.routes.js";
import routers_price from "./routers/price.routes.js";
import routers_detail_price_pruduct from "./routers/detail_price_product.routes.js";
import routers_detail_price_service from "./routers/detail_price_service.routes.js";
import db from './js/conexion.js'

const app = express();

// seting
app.set("PORT", process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.get("/", async (req, res) => {
  res.json({ message: "good" });
});

const connection = (async () => {
  try {
    await db.authenticate();
    console.log("online");
  } catch (error) {
    throw new Error(error);
  }
})();

app.use("/vehicle", routers_vehicle);
app.use("/service", routers_service)
app.use("/price", routers_price)
app.use("/detail_price_product", routers_detail_price_pruduct)
app.use("/detail_price_service", routers_detail_price_service)

export default app;
