import db from "#db/client";
import { createUser } from "./users.js";

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
}
export default seed;
