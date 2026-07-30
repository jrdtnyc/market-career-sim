import express from "express";
export const router = express.Router();

import { userRouter } from "./users.js";
import { productRouter } from "./products.js";

router.use("/users", userRouter);
router.use("/products", productRouter);
