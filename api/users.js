import express from "express";
export const userRouter = express.Router();
import { fetchUsers, createUser, authenticate } from "#db/users";

/*http://localhost:3000/market/users/

/* For debugging! */
userRouter.get("/", async (req, res, next) => {
  res.send(await fetchUsers());
});
/* For debugging! */

userRouter.post("/", async (req, res, next) => {
  res.send(await createUser(req.body));
});

userRouter.post("/login", async (req, res, next) => {
  const response = await authenticate(req.body);
  console.log(response);
  res.send({ token: response });
});

export default userRouter; //NOTE!
