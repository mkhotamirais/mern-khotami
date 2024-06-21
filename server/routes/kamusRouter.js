import { getKamusById, updateKamus, getKamus, postKamus, deleteKamus } from "../controllers/kamusController.js";
import { isLogin, isAdmin } from "../helper/middleware.js";

import express from "express";
const router = express.Router();

router.route("/").get(getKamus).post(isLogin, isAdmin, postKamus);
router.route("/:id").get(getKamusById).patch(isLogin, isAdmin, updateKamus).delete(isLogin, isAdmin, deleteKamus);

export default router;
