import { Router } from "express";
import {
  delete_price,
  get_price,
  get_price_id,
  post_price,
  put_price,
} from "../controllers/price.controller.js";

const router = Router();

router.get("/", get_price);

router.get("/id/", get_price_id);

router.post("/", post_price);

router.put("/", put_price);

router.delete("/", delete_price);

export default router;
