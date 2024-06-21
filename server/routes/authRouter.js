import {
  signup,
  signin,
  getMe,
  updateMe,
  deleteMe,
  signout,
} from "../controllers/authController.js";
import { isLogin, isAdmin } from "../helper/middleware.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.patch("/signin", signin);
router.use(isLogin);
router.patch("/signout", signout);
// router.use(isAdmin);
router.route("/me").get(getMe).patch(updateMe).delete(deleteMe);

export default router;
