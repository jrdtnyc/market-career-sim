import express from "express";
export const userRouter = express.Router();
import { fetchUsers } from "#db/users";

/* For debugging! */
userRouter.get("/", async (req, res, next) => {
  res.send(await fetchUsers());
});
/* For debugging! */
