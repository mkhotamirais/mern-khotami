import {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isLogin, isAdmin } from "../helper/middleware.js";
import express from "express";
const router = express.Router();

router.route("/").get(getProducts).post(isLogin, isAdmin, postProduct);
router.route("/:id").get(getProductById).patch(isLogin, isAdmin, updateProduct).delete(isLogin, isAdmin, deleteProduct);

export default router;
