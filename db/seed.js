import db from "#db/client";
import { createUser } from "./users.js";
import { createProducts } from "./products.js";
import { createOrders } from "./orders.js";
import { addProductToOrders } from "./orders.js";

async function seed() {
  // TODO
  const SQL = `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS products CASCADE;
        DROP TABLE IF EXISTS orders CASCADE;
        DROP TABLE IF EXISTS orders_products CASCADE;

        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL
        );

        CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL UNIQUE,
            description VARCHAR(1000) NOT NULL,
            price DECIMAL NOT NULL
        );

        CREATE TABLE orders(
            id SERIAL PRIMARY KEY,
            date date NOT NULL,
            note VARCHAR(1000),
            user_id INT REFERENCES users(id) NOT NULL
        );

        CREATE TABLE orders_products(
            order_id INT REFERENCES orders(id) NOT NULL,
            product_id INT REFERENCES products(id) NOT NULL,
            quantity INT NOT NULL
        );
`;
  await db.query(SQL);
  console.log("🌱 Database seeded.");
  //Users------------------------------------------------------------------
  const user1 = await createUser({ username: "John Doe", password: "mytest" });
  const user2 = await createUser({ username: "Jane Doe", password: "mytest2" });
  //const test3 = createUser({ username: "Dan Halen", password: "mytest3" });

  //Orders------------------------------------------------------------------
  const order1 = await createOrders({
    date: "2022-11-21",
    note: "Christmas gifts for litte Robert",
    user_id: user2.id,
  });

  const order2 = await createOrders({
    date: "2022-12-05",
    note: "Christmas gifts for litte Al",
    user_id: user1.id,
  });

  //Products----------------------------------------------------------------
  const product1 = await createProducts({
    title: "A ball",
    description: "A simple ball",
    price: 1.99,
  });

  const product2 = await createProducts({
    title: "A toy car",
    description: "A simple toy car",
    price: 6.99,
  });

  const product3 = await createProducts({
    title: "A toy truck",
    description: "A simple toy truck",
    price: 10.99,
  });

  const product4 = await createProducts({
    title: "A toy motorcycle",
    description: "A simple toy motorcycle",
    price: 12.99,
  });

  const product5 = await createProducts({
    title: "A toy plane",
    description: "A simple toy plane",
    price: 22.99,
  });

  const product6 = await createProducts({
    title: "A toy helicopter",
    description: "A simple toy helicopter",
    price: 25.99,
  });

  const product7 = await createProducts({
    title: "A toy soldier",
    description: "A simple toy soldier",
    price: 3.59,
  });

  const product8 = await createProducts({
    title: "A toy dinosaur",
    description: "A simple toy dinosaur",
    price: 9.99,
  });

  const product9 = await createProducts({
    title: "A toy lion",
    description: "A simple toy lion",
    price: 7.49,
  });

  const product10 = await createProducts({
    title: "A video game system",
    description: "A simple video game system",
    price: 999.99,
  });

  //Orders In Products----------------------------------------------------------------
  const orderedProducts1 = await addProductToOrders({
    order_id: order1.id,
    product_id: product10.id,
    quantity: 1,
  });

  const orderedProducts2 = await addProductToOrders({
    order_id: order1.id,
    product_id: product7.id,
    quantity: 2,
  });

  const orderedProducts3 = await addProductToOrders({
    order_id: order1.id,
    product_id: product6.id,
    quantity: 1,
  });

  const orderedProducts4 = await addProductToOrders({
    order_id: order1.id,
    product_id: product5.id,
    quantity: 3,
  });

  const orderedProducts5 = await addProductToOrders({
    order_id: order1.id,
    product_id: product4.id,
    quantity: 2,
  });
}

export default seed;
