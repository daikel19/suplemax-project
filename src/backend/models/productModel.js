import db from '../db.js';

export const getAllProducts = async () => {
  const [rows] = await db.execute('SELECT * FROM productos');
  return rows;
};

export const getProductsByCategory = async (categoria) => {
  const [rows] = await db.execute(
    'SELECT * FROM productos WHERE categoria = ?',
    [categoria]
  );
  return rows;
};
