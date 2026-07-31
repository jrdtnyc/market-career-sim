import express from "express";
export const orderRouter = express.Router();
import { isLoggedIn } from "#middleware/authMiddleware";
import { fetchOrders, createOrders, createOrder } from "#db/orders";

/* Fetch Products http://localhost:3000/market/orders/ */
orderRouter.get("/", async (req, res, next) => {
  res.send(await fetchOrders());
});

/* Create Orders http://localhost:3000/market/orders/ */
orderRouter.post("/", isLoggedIn, async (req, res, next) => {
  const { id: thisUserId } = req.user;
  const { date, note } = req.body;

  console.log(`Your values ${thisUserId} ${date} ${note}`);

  if (!req.body) {
    return res.status(400).send("400 Error: Request body required.");
  }

  if (!date) {
    return res.status(400).send("400 Error: Missing date!");
  }

  res.send(await createOrder(date, note, thisUserId));
});
