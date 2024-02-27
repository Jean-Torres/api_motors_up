import { Router } from "express";
import {
  delete_detail_price_product,
  get_detail_price_product,
  get_detail_price_product_id,
  post_detail_price_product,
  put_detail_price_product,
} from "../controllers/detail_price_product.js";

const router = Router();

router.get("/", get_detail_price_product);

router.get("/id/", get_detail_price_product_id);

router.post("/", post_detail_price_product);

router.put("/", put_detail_price_product);

router.delete("/", delete_detail_price_product);

export default router;
