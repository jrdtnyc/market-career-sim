import express from "express";
export const userRouter = express.Router();
import { fetchUsers, createUser, authenticate } from "#db/users";
import { isLoggedIn } from "#middleware/authMiddleware";

/* http://localhost:3000/market/users/ */

/* For debugging! */
userRouter.get("/", async (req, res, next) => {
  res.send(await fetchUsers());
});
/* For debugging! */

/*Register - http://localhost:3000/market/users/register */
userRouter.post("/register", async (req, res, next) => {
  if (!req.body)
    return res.status(400).send("400 Error: Request body required.");

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("400 Error: Missing username or password!");
  }

  res.send(await createUser(req.body));
});

/*Login - http://localhost:3000/market/users/login */
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

/* Test authMiddleware isLoggedIn */
userRouter.get("/me", isLoggedIn, async (req, res, next) => {
  console.log("User Token is valid");
  res.send(req.user);
  console.log(req.user);
  /* this is how you get your loggedin id */
  const test = req.user;
  const { id } = test;
  console.log(`This is your logged in ${id}`);
});
/* Test authMiddleware isLoggedIn  */

export default userRouter; //NOTE!
