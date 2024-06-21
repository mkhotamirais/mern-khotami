import {
  getCategories,
  getCategoryById,
  postCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { isLogin, isAdmin } from "../helper/middleware.js";

import express from "express";
const router = express.Router();

router.route("/").get(getCategories).post(isLogin, isAdmin, postCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .patch(isLogin, isAdmin, updateCategory)
  .delete(isLogin, isAdmin, deleteCategory);

export default router;
