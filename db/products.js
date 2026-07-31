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

//sends an array of all orders made by the user that include this product
export async function getUserOrdersByProduct(user, product) {
  console.log(user, product);
  const SQL = `
SELECT * FROM orders WHERE id = (SELECT order_id FROM orders_products where product_id = $2)
and user_id = $1
  `;
  const response = await db.query(SQL, [user, product]);
  return response.rows;
}
