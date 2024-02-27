import { Router } from "express";
import {
  delete_service,
  get_service,
  get_service_id,
  post_service,
  put_service,
} from "../controllers/service.controller.js";

const router = Router();

router.get("/", get_service);

router.get("/id/", get_service_id);

router.post("/", post_service);

router.put("/", put_service);

router.delete("/", delete_service);

export default router;
