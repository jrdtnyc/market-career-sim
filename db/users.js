import db from "#db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (newUser) => {
  if (!newUser.username.trim() || !newUser.password.trim()) {
    throw Error("Please provide a combination of username and password!");
  }

  newUser.password = await bcrypt.hash(newUser.password, 10);
  const SQL = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
    `;
  const response = await db.query(SQL, [newUser.username, newUser.password]);
  return response.rows[0]; //Return the created record
};

/* For debugging! */
export const fetchUsers = async () => {
  const SQL = `
        SELECT *
        FROM users
    `;
  const response = await db.query(SQL);
  return response.rows; //
};
/* For debugging! */

export const authenticate = async (credentials) => {
  const SQL = `
SELECT id, password
FROM users
WHERE username =$1
`;
  const response = await db.query(SQL, [credentials.username]);
  if (!response.rows.length) {
    const error = new Error("Unable to authenticate!");
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(
    credentials.password,
    response.rows[0].password,
  );
  if (!valid) {
    const error = new Error("Unable to authenticate!");
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT_SECRET);
};

//getUserById
export async function getUserById(id) {
  const SQL = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const response = await db.query(SQL, [id]);
  return response.rows;
}

/*This is for middleware! Verify token and throw error if nothing is found */
export const findUserByToken = async (token) => {
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const SQL = `
SELECT id, username FROM users 
WHERE id = $1
`;
  const response = await db.query(SQL, [payload.id]);
  if (!response.rows.length) {
    const error = new Error("Invalid auth token!");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};
