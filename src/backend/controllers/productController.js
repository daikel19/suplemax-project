import { getConnection } from '../db.js';

export const getProducts = async (req, res) => {
  const { categoria } = req.query;

  
  try {
    const db = await getConnection();
    let query = `
      SELECT p.*, c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON p.id_categoria = c.id
    `;
    const params = [];

    if (categoria) {
      query += ' WHERE c.nombre = ?';
      params.push(categoria);
    }

    const [productos] = await db.execute(query, params);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { nombre } = req.params;
  try {
    const db = await getConnection();
    const query = `
      SELECT p.* FROM productos p
      JOIN categorias c ON p.id_categoria = c.id
      WHERE c.nombre = ?`;
    const [productos] = await db.execute(query, [nombre]);
    res.json(productos);
  } catch (error) {
    console.error("Error al filtrar por categoría:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
