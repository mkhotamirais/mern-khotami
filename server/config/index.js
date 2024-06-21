import mongoose from "mongoose";
import { uri } from "./constants.js";

const db = mongoose.connect(uri);

export default db;
