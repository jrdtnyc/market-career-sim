import express from "express";
import app from "#app";
import db from "#db/client";
import { router } from "#api/index";
import seed from "#db/seed";
app.use(express.json());
app.use("/market", router); /* --> http://localhost:3000/market/ */

const init = async () => {
  await db.connect();
  console.log("Connected to Market Database!");
  await seed(); //Run to seed fresh db
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init();
