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

/* Return a users orders */
export async function getUserOrdersByID(user, order) {
  console.log(user, order);
  const SQL = `
SELECT * FROM orders WHERE id = $2
and user_id = $1
  `;
  const response = await db.query(SQL, [user, order]);
  return response.rows;
}

export async function getProductsInOrder(user, order) {
  console.log(user, order);
  const SQL = `
WITH prod_id_table AS
(SELECT  orders_products.product_id,orders_products.quantity FROM orders_products WHERE orders_products.order_id=
(SELECT id FROM orders WHERE id = $2 AND user_id =$1))
SELECT prod_id_table.product_id, prod_id_table.quantity, products.title, products.description, products.price
FROM prod_id_table
LEFT JOIN products
ON prod_id_table.product_id = products.id;

  `;
  const response = await db.query(SQL, [user, order]);
  return response.rows;
}
