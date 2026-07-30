import express from "express";
export const userRouter = express.Router();
import { fetchUsers, createUser, authenticate } from "#db/users";

/*http://localhost:3000/market/users/ */

/* For debugging! */
userRouter.get("/", async (req, res, next) => {
  res.send(await fetchUsers());
});
/* For debugging! */

/*Register*/
userRouter.post("/register", async (req, res, next) => {
  if (!req.body)
    return res.status(400).send("400 Error: Request body required.");

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("400 Error: Missing username or password!");
  }

  res.send(await createUser(req.body));
});
/*Register*/

/*Login*/
userRouter.post("/login", async (req, res, next) => {
  if (!req.body)
    return res.status(400).send("400 Error: Request body required.");
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("400 Error: Missing username or password!");
  }

  const response = await authenticate(req.body);
  console.log(response);
  res.send({ token: response });
});
/*Login*/

userRouter.get("/me", async (req, res, next) => {});

export default userRouter; //NOTE!
