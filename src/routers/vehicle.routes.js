import { Router } from "express";
import {
  get_vehicle,
  post_vehicle,
  put_vehicle,
  delete_vehicle,
  get_vehicle_id,
} from "../controllers/vehicle.controller.js";

const router = Router();

router.get("/", get_vehicle);

router.get("/id/", get_vehicle_id);

router.post("/", post_vehicle);

router.put("/", put_vehicle);

router.delete("/", delete_vehicle);

export default router;
