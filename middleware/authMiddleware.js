import { findUserByToken } from "#db/users";

export const isLoggedIn = async (req, res, next) => {
  const user = await findUserByToken(req.headers.authorization);
  console.log(user);
};
