import { getTagById, updateTag, deleteTag, postTag, getTags } from "../controllers/tagController.js";
import { isLogin, isAdmin } from "../helper/middleware.js";
import express from "express";
const router = express.Router();

router.route("/").get(getTags).post(isLogin, isAdmin, postTag);
router.route("/:id").get(getTagById).patch(isLogin, isAdmin, updateTag).delete(isLogin, isAdmin, deleteTag);

export default router;
