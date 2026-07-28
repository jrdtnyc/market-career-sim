import express from "express";
export const userRouter = express.Router();
import { fetchUsers, createUser } from "#db/users";

/* For debugging! */
userRouter.get("/", async (req, res, next) => {
  res.send(await fetchUsers());
});

userRouter.post("/", async (req, res, next) => {
  res.send(await createUser(req.body));
});

/* For debugging! */
