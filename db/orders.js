import db from "#db/client";

export const fetchOrders = async () => {
  const SQL = `
        SELECT *
        FROM orders
    `;
  const response = await db.query(SQL);
  return response.rows;
};

//Fetch orders of logged in user
export const fetchMyOrders = async (user) => {
  const { id } = user;
  const SQL = `
        SELECT *
        FROM orders
        WHERE user_id = 2
    `;
  const response = await db.query(SQL);
  return response.rows;
};

/* This is for seeding and debugging */
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

/* For actual use - Create new order for logged in user */
export const createOrder = async (date, note, userIdentifier) => {
  console.log(`These are my SQL IDs ${userIdentifier} ${date} ${note}`);
  const SQL = `
        INSERT INTO orders(date, note, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  const response = await db.query(SQL, [date, note, userIdentifier]);
  return response.rows[0];
};

/* Add product to order */
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
