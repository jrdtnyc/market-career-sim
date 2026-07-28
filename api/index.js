import express from "express";
export const router = express.Router();

import { userRouter } from "./users.js";

router.use("/users", userRouter);
