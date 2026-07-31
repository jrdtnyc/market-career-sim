import express from "express";
export const productRouter = express.Router();
import { isLoggedIn } from "#middleware/authMiddleware";
import {
  createProducts,
  fetchProducts,
  getProductById,
  getUserOrdersByProduct,
} from "#db/products";

/* http://localhost:3000/market/products/ */

/* Fetch Products - http://localhost:3000/market/products/ */
productRouter.get("/", async (req, res, next) => {
  res.send(await fetchProducts());
});

/* Create Products http://localhost:3000/market/products/ */
productRouter.post("/", async (req, res, next) => {
  if (!req.body)
    return res.status(400).send("400 Error: Request body required.");

  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(400).send("400 Error: Missing product information!!");
  }

  res.send(await createProducts(req.body));
});

/* Get product by id - http://localhost:3000/market/products/id: */
productRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const dbResponse = await getProductById(id);
  console.log(dbResponse);
  if (dbResponse.length == 0) {
    return res.status(404).send("404 Error: This product does not exist!");
  }

  res.send(dbResponse);
});

/* get orders by product id - http://localhost:3000/market/products/id:/orders */
productRouter.get("/:id/orders", isLoggedIn, async (req, res, next) => {
  const { id: thisProductID } = req.params;
  const { id: thisUserID } = req.user;
  if (!thisUserID) {
    return res.status(404).send("404 Error: Please log in");
  }
  const dbResponse = await getProductById(thisProductID);
  if (dbResponse.length == 0) {
    return res.status(404).send("404 Error: This product does not exist!");
  }
  const dbResponse2 = await getUserOrdersByProduct(thisUserID, thisProductID);
  res.send(dbResponse2);
});
