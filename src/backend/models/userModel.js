import { db } from '../db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async ({ nombre, email, password }) => {
  const [result] = await db.execute(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
    [nombre, email, password, 'cliente']
  );
  return result.insertId;
};
