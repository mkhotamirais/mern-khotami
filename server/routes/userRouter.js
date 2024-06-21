import {
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
  postUser,
} from "../controllers/userController.js";
import { isLogin, isAdmin } from "../helper/middleware.js";
import express from "express";
const router = express.Router();

router.use(isLogin, isAdmin);
router.route("/").get(getUsers).post(postUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
