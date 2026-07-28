import express from "express";
import app from "#app";
import db from "#db/client";
import seed from "#db/seed";
app.use(express.json());
//app.use("/api", router);

const init = async () => {
  await db.connect();
  console.log("connected to Market Database!");
  await seed();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init();
