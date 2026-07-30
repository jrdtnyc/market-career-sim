import db from "#db/client";

export const fetchOrders = async () => {
  const SQL = `
        SELECT *
        FROM orders
    `;
  const response = await db.query(SQL);
  return response.rows;
};

export const createOrders = async (newOrder) => {
  const { date, note, user_id } = newOrder;
  const SQL = `
        INSERT INTO orders(date, note, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const response = await db.query(SQL, [date, note, user_id]);
  return response.rows[0];
};

export const addProductToOrders = async (newProdToOrder) => {
  const { order_id, product_id, quantity } = newProdToOrder;
  const SQL = `
INSERT INTO orders_products(order_id, product_id, quantity)
VALUES ($1, $2, $3)
RETURNING *
`;
  const response = await db.query(SQL, [order_id, product_id, quantity]);
  return response.rows[0];
};
