import express from "express";
export const orderRouter = express.Router();
import { isLoggedIn } from "#middleware/authMiddleware";
import {
  fetchOrders,
  fetchMyOrders,
  createOrders,
  createOrder,
  getUserOrdersByID,
  getProductsInOrder,
  updateProductQuantityInOrder,
} from "#db/orders";

/* Fetch Orders http://localhost:3000/market/orders/ 
orderRouter.get("/", async (req, res, next) => {
  res.send(await fetchOrders());
}); */

/* Fetch Orders http://localhost:3000/market/orders/ */
orderRouter.get("/", isLoggedIn, async (req, res, next) => {
  //const { id: thisUserID } = req.user;
  res.send(await fetchMyOrders(req.user)).status(201);
});

/* Create Orders http://localhost:3000/market/orders/ <--Send */
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

/* Return orders that belong to the signed in user based on submitted http://localhost:3000/market/orders/:id */
orderRouter.get("/:id", isLoggedIn, async (req, res, next) => {
  const { id: thisOrderID } = req.params;
  const { id: thisUserID } = req.user;
  if (!thisUserID) {
    return res.status(403).send("403 Error: Please log in");
  }
  const dbResponse = await getUserOrdersByID(thisUserID, thisOrderID); ////
  if (dbResponse.length == 0) {
    return res.status(404).send("404 Error: This order does not exist!");
  }
  const dbResponse2 = await getUserOrdersByID(thisUserID, thisOrderID);
  res.send(dbResponse2);
});

/* Get the products in a user's order http://localhost:3000/market/orders/:id/products */
orderRouter.get("/:id/products", isLoggedIn, async (req, res, next) => {
  const { id: thisOrderID } = req.params;
  const { id: thisUserID } = req.user;
  if (!thisUserID) {
    return res.status(403).send("403 Error: Please log in to your account");
  }
  const dbResponse = await getProductsInOrder(thisUserID, thisOrderID); ////
  if (dbResponse.length == 0) {
    return res.status(404).send("404 Error: This order does not exist!");
  }
  const dbResponse2 = await getProductsInOrder(thisUserID, thisOrderID);
  res.send(dbResponse2);
});

/* Get products in user's order http://localhost:3000/market/orders/:id/products */
orderRouter.get("/:id/products", isLoggedIn, async (req, res, next) => {
  const { id: thisOrderID } = req.params;
  const { id: thisUserID } = req.user;
  if (!thisUserID) {
    return res.status(403).send("403 Error: Please log in to your account");
  }
  const dbResponse = await getProductsInOrder(thisUserID, thisOrderID); ////
  if (dbResponse.length == 0) {
    return res.status(404).send("404 Error: This order does not exist!");
  }
  const dbResponse2 = await getProductsInOrder(thisUserID, thisOrderID);
  res.send(dbResponse2);
});

/* Update products in user's order http://localhost:3000/market/orders/:id/products */
orderRouter.post("/:id/products", isLoggedIn, async (req, res, next) => {
  if (!req.body)
    return res.status(400).send("400 Error: Request body required.");

  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    return res.status(400).send("Missing information!");
  }
  const { id: thisOrderID } = req.params;
  const { id: thisUserID } = req.user;
  if (!thisUserID) {
    return res.status(403).send("403 Error: Please log in to your account");
  }
  const dbResponse = await getProductsInOrder(thisUserID, thisOrderID); ////
  if (dbResponse.length == 0) {
    return res.status(404).send("404 Error: This order does not exist!");
  }
  const dbResponse2 = await updateProductQuantityInOrder(
    thisUserID,
    thisOrderID,
    product_id,
    quantity,
  );
  res.send(dbResponse2);
});
