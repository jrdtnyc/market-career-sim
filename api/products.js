import express from "express";
export const productRouter = express.Router();
import { isLoggedIn } from "#middleware/authMiddleware";
import { createProducts, fetchProducts, getProductById } from "#db/products";

/* http://localhost:3000/market/products/ */

productRouter.get("/", async (req, res, next) => {
  res.send(await fetcProducts());
});

productRouter.post("/", async (req, res, next) => {
  if (!req.body)
    return res.status(400).send("400 Error: Request body required.");

  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(400).send("400 Error: Missing product information!!");
  }

  res.send(await createProducts(req.body));
});

productRouter.get("/:id", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("400 Error: Record Not found!");
  }
  const { id } = req.params;
  res.send(await getProductById(id));
});
