import db from "#db/client";

export const createProducts = async (newProduct) => {
  const { name, description, price, image } = newGame;
  const SQL = `
        INSERT INTO products(name, description, price, image)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
  const response = await db.query(SQL, [name, description, price, image]);
  return response.rows[0];
};

export const fetchProducts = async () => {
  const SQL = `
        SELECT *
        FROM products
    `;
  const response = await db.query(SQL);
  return response.rows;
};
