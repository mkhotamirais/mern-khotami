import express from "express";
import { port } from "./config/constants.js";
const app = express();
import db from "./config/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import categoryRoute from "./routes/categoryRouter.js";
import tagsRoute from "./routes/tagRouter.js";
import authRoute from "./routes/authRouter.js";
import userRoute from "./routes/userRouter.js";
import productRoute from "./routes/productRouter.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`khotami-mern`);
});

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use((req, res, next) => {
  if (allowedOrigins.includes(req.headers.origin)) res.header("Access-Control-Allow-Credentials", true);
  next();
});

const corsOptions = {
  origin: function (origin, callback) {
    allowedOrigins.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/khotami-mern/category", categoryRoute);
app.use("/api/khotami-mern/tag", tagsRoute);
app.use("/api/khotami-mern/auth", authRoute);
app.use("/api/khotami-mern/user", userRoute);
app.use("/api/khotami-mern/product", productRoute);

db.then(() => {
  app.listen(port, () => console.log(`connect to mongodb, running on port ${port}`));
}).catch((err) => {
  console.log(err.message);
});
