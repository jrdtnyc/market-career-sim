export const fetchOrders = async () => {
  const SQL = `
        SELECT *
        FROM orders
    `;
  const response = await client.query(SQL);
  return response.rows;
};
