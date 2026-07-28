import db from "#db/client";

export const fetchOrders = async () => {
  const SQL = `
        SELECT *
        FROM orders
    `;
  const response = await db.query(SQL);
  return response.rows;
};
