import db from "#db/client";

export const createProducts = async (newProduct) => {
  const { title, description, price } = newProduct;
  const SQL = `
        INSERT INTO products(title, description, price)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const response = await db.query(SQL, [title, description, price]);
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

export async function getProductById(id) {
  const SQL = `
  SELECT *
  FROM products
  WHERE id = $1
  `;
  const response = await db.query(SQL, [id]);
  return response.rows;
}
