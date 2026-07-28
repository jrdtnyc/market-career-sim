import db from "#db/client";

/* For debugging! */
export const createUser = async (user) => {
  const SQL = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
    `;
  const response = await client.query(SQL, [user.username, user.password]);
  return response.rows[0];
};

export const fetchUsers = async () => {
  const SQL = `
        SELECT *
        FROM users
    `;
  const response = await client.query(SQL);
  return response.rows;
};
/* For debugging! */
