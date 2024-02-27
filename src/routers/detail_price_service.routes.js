import { Router } from "express";
import {
  delete_detail_price_service,
  get_detail_price_service,
  get_detail_price_service_id,
  post_detail_price_service,
  put_detail_price_service,
} from "../controllers/detail_price_service.js";

const router = Router();

router.get("/", get_detail_price_service);

router.get("/id/", get_detail_price_service_id);

router.post("/", post_detail_price_service);

router.put("/", put_detail_price_service);

router.delete("/", delete_detail_price_service);

export default router;
